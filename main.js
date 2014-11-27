var _ = require('lodash');



var Cell = (function () {

	var encode, getSurvivingCells, getBornCells, checkCell;

	var Cell = function (x, y) {
		if(typeof x === 'string') {
			this.x = +x.split(':')[0];
			this.y = +x.split(':')[1];
		} else {
			this.x = x;
			this.y = y;
		}
		Cell.livingCells[this.x+":"+this.y] = this;
	};

	Cell.prototype.die = function () {
		delete Cell.livingCells[this.x+":"+this.y];
	};

	Cell.prototype.countN = function () {
		return this.getNearbyCellTags().reduce(function (total, cell) {
			return Cell.at(cell) ? total + 1 : total;
		}, 0);
	};

	Cell.prototype.getNearbyCellTags = function () {
		var nearby = [], t = [-1, 0, 1];
		t.forEach(function (dx) {
			t.forEach(function (dy) {
				if(dx !== 0 || dy !==0) nearby.push(encode(this.x+dx, this.y+dy));
			}, this);
		}, this);
		return nearby;
	};

	Cell.prototype.canSurvive = function () {
		var n = this.countN();
		return !(n < 2 || n > 3);
	};

	Cell.prototype.canBeBorn = function () {
		return this.countN() === 3;
	};


	Cell.livingCells = {};

	Cell.reset = function () {
		Cell.livingCells = {};
	};
	Cell.at = function (x, y) {
		return !!Cell.livingCells[encode(x,y)];
	};

	Cell.advance = function () {
		var cellsBornThisTick, cellsSurvivingThisTick;

		cellsBornThisTick = getBornCells();
		cellsSurvivingThisTick = getSurvivingCells();

		Cell.livingCells = _.assign(cellsSurvivingThisTick, cellsBornThisTick);
	};

	getBornCells = function () {
		var cells = {};
		_.forEach(Cell.livingCells, function (cell) {
			cell.getNearbyCellTags().forEach(checkCell.bind(null, cells));
		});
		return cells;
	};

	checkCell = function (cells, tag) {
		var c;

		if (Cell.at(tag)) return;

		c = new Cell(tag);
		if( c.canBeBorn() ) cells[tag] = c;

		c.die();
	};

	getSurvivingCells = function () {
		return _.pick(Cell.livingCells, function (cell) {
			return Cell.livingCells[encode(cell.x, cell.y)].canSurvive();
		});
	};

	encode = function (x, y) {
		return typeof x === 'string' ? x : x + ':' + y;
	};

	return Cell;

}());

exports.Cell = Cell;