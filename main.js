var _ = require('lodash');

var Game = (function () {
	var SIZE;

	SIZE = 3;
	var Game = function (seed) {
		this.board = seed || this.seed();
	};

	Game.prototype.seed = function () {
	    var seed, x, y;
		seed = [];

		for(x = 0; x < SIZE; x++) {
			seed[x] = [];
			for(y = 0; y < SIZE; y++) {
				seed[x][y] = false;
			}
		}

		return seed
	};

	Game.prototype.at = function (x, y) {
		if(this.isWithinBounds(x, y)) {
			return !!this.board[x][y];
		}
	    return false;
	};

	Game.prototype.isWithinBounds = function (x, y) {
	    return x >= 0 && y >= 0 && x < SIZE && y < SIZE;
	};

	Game.prototype.spawn = function (x, y) {
	    var seed;

		if(this.isWithinBounds(x, y)) {
			seed = _.cloneDeep(this.board);
			seed[x][y] = true;

			return new Game(seed);
		}
		throw new Error("Out of bounds");
	};

	Game.prototype.tick = function () {
		var seed, self;
		self = this;

		seed = this.board.reduce(function(total, row, x){
			total[x] = row.reduce(function (subTotal, cell, y) {
				var nCount = self.getNeighbourCount(x, y);
				subTotal[y] = nCount === 3 || (self.at(x, y) && nCount === 2);
				return subTotal;
			}, []);
			return total;
		}, []);

		return new Game(seed);
	};

	Game.prototype.getNeighbourCount = function (x, y) {
		var self = this;
		return [-1, 0, 1].reduce(function (total, dx) {
			return total + [-1, 0, 1].reduce(function (subtotal, dy) {
				if(dx === 0 && dy === 0) {
					return subtotal;
				}
				return subtotal + +self.at(x+dx, y+dy);
			}, 0);
		}, 0);
	};

	return Game;
}());


module.exports = Game;