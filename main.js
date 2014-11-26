var _ = require('lodash');

var GameOfLife = function () {

	var that, encode, decode, shouldSurvive;
	that = {};

    that.board = {};

    that.at = function (x, y) {
		return !!that.board[encode(x, y)];
	};

	that.spawn = function (x, y) {
		that.board[encode(x, y)] = true;
	};

	that.kill = function(x, y) {
		that.board[encode(x, y)] = null;
	};

	that.countN = function (tag) {
		return that.getCellsInProximity(tag).reduce(function (total, cell) {
			return cell !== tag && that.at(cell) ? total + 1 : total;
		}, 0);
	};

	that.tick = function () {
        that.board = _.keys(that.board).reduce(function (board, cell) {
            if (shouldSurvive(cell)) board[cell] = true;
            that.searchForLifeAround(cell, board);
            return board;
        }, {});
	};

	that.searchForLifeAround = function (tag, boardCopy) {
		that.getCellsInProximity(tag).forEach(function (cell) {
			if( 3 === that.countN(cell) ) boardCopy[cell] = true;
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

    shouldSurvive = function (cell) {
        var n = that.countN(cell);
        return n >= 2 && n <= 3;
    };


	return that;
};

module.exports = {
	new: GameOfLife
};