var _ = require('lodash');

var GameOfLife = function () {

	var board, that, encode, decode;
	board = {};
	that = {};

	that.at = function (x, y) {
		return !!board[encode(x, y)];
	};

	that.spawn = function (x, y) {
		board[encode(x, y)] = true;
	};

	that.kill = function(x, y) {
		board[encode(x, y)] = null;
	};

	that.countN = function (tag) {
		return that.getCellsInProximity(tag).reduce(function (total, cell) {
			var isAlive = that.at(cell);
			return cell !== tag && isAlive ? total + 1 : total;
		}, 0);
	};

	that.tick = function () {
		_.keys(board).forEach(function (cell) {
			var n = that.countN(cell);
			if (n < 2 || n > 3) board[cell] = null;
			that.searchForLifeAround(cell);
		});
	};

	that.searchForLifeAround = function (tag) {
		that.getCellsInProximity(tag).forEach(function (cell) {
			if( 3 === that.countN(cell) ) that.spawn(cell)
		});
	};

	that.getCellsInProximity = function (tag) {
		var x = decode(tag).x, y = decode(tag).y, t = [-1, 0, 1], proximity = [];
		t.forEach(function (dx) {
			t.forEach(function (dy) { proximity.push(encode(x+dx, y+dy)) });
		});
		return proximity;
	};


	encode = function (x, y) {
		return 'string' === typeof x ? x : x + ',' + y;
	};

	decode = function (xy) {
		xy = xy.split(',');
		return {
			x: +xy[0],
			y: +xy[1]
		};
	};


	return that;
};

module.exports = {
	new: GameOfLife
};