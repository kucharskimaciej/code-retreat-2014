var _ = require('lodash');

var Cell = (function () {
	var Cell = function (x, y) {
		this.x = x;
		this.y = y;
		this.coords = x+':'+y;

		this.neighbourCoords = this.getNeighbourCoords();

		Cell.livingCells[this.coords] = this;
	};

	Cell.prototype.getNeighboursCount = function () {
		return this.neighbourCoords.reduce(function (total, coord) {
			return total + +(!!Cell.livingCells[coord]);
		}, 0);
	};

	Cell.prototype.getNeighbourCoords = function () {
		var neighbourCoords = [], delta = [-1, 0, 1],
			x = this.x, y = this.y;

		delta.forEach(function (dx) {
			delta.forEach(function (dy) {
				(dx || dy) && neighbourCoords.push((x+dx)+':'+(y+dy));
			}, this);
		}, this);
		return neighbourCoords;
	};

	Cell.prototype.makeBabies = function (survivingCellsHash) {
		var survives, tryMake;
	    survives = function (cell) {
			return (cell.getNeighboursCount() === 3) &&
				(survivingCellsHash[cell.coords] = cell);
		};

		tryMake = function (x, y) {
			var maybeBaby;
			maybeBaby = new Cell(x, y);
			survives(maybeBaby);
			maybeBaby.die();
		};

		this.neighbourCoords.forEach(function (coords) {
			var x, y;
			x = +coords.split(':')[0];
			y = +coords.split(':')[1];

			!Cell.at(x, y) && tryMake(x, y);
		}, this);
	};

	Cell.prototype.die = function () {
		delete Cell.livingCells[this.coords];
	};

	Cell.tick = function () {
		var cellHash = {};
		_.keys(Cell.livingCells).forEach(function (coords) {
			var cell, nCount;
			cell = Cell.livingCells[coords];
			nCount = cell.getNeighboursCount();

			(nCount === 2 || nCount === 3) && (cellHash[coords] = cell);
			cell.makeBabies(cellHash);
		});
		Cell.livingCells = cellHash;
	};

	Cell.livingCells = {};
	Cell.resetStatus = function () {
		Cell.livingCells = {};
	};
	Cell.at = function (x, y) {
		return Cell.livingCells[x+':'+y] || null;
	};

	return Cell;

}());

module.exports = Cell;