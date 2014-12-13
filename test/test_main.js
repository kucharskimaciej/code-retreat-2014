var _ = require('lodash');
var should = require('should');

var Cell = require('../main.js');

describe('Cell<class>', function () {

	it('has knowledge of all living cells', function () {
		should.exist(Cell.livingCells);
	});

	describe(':at', function () {
		it('returns null if there is no living cell at coords', function () {
			should.not.exist(Cell.at(0, 0));
		});
	});

});

describe('Cell', function () {
	it('knows it\' own coordinates', function () {
		var cell = new Cell(0, 0);

		should.exist(cell.x);
		should.exist(cell.y);
	});

	it('creating a cell allows \'at\' to find it', function () {
		new Cell(0, 0);

		Cell.at(0, 0).should.be.ok;
	});

	describe('#getNeighboursCount', function () {
		beforeEach(function () {
			Cell.resetStatus();
		});

		it('returns a number of living neighbours for a cell', function () {
			var cell = new Cell(0, 0);
			new Cell(0, 1);

			should.equal(cell.getNeighboursCount(), 1);
		});
	});

	describe('rules(:next)', function () {
		beforeEach(function () {
			Cell.resetStatus();
		});

		it('dies when it\'s neighbour count is less than 2 ', function () {
			new Cell(0, 0);
			should.exist(Cell.at(0, 0));
			Cell.tick();
			should.not.exist(Cell.at(0, 0));
		});

		it('dies when it\'s neighbour count is more then 3', function () {
			new Cell(0, 0);
			new Cell(0, 1);
			new Cell(1, 1);
			new Cell(1, 0);
			new Cell(-1, 0);

			Cell.tick();
			should.not.exist(Cell.at(0,0));
		});

		it('survives when nCount is 2', function () {
			new Cell(0, 0);
			new Cell(1, 0);
			new Cell(0, 1);

			Cell.tick();
			should.exist(Cell.at(0, 0));
		});

		it('survives when nCount is 3', function () {
			new Cell(0, 0);
			new Cell(1, 0);
			new Cell(0, 1);
			new Cell(1, 1);

			Cell.tick();
			should.exist(Cell.at(0, 0));
		});

		it('spawns babies (new cells) when their neighbour count is 3', function () {
			new Cell(1, 0);
			new Cell(0, 1);
			new Cell(1, 1);

			Cell.tick();
			should.exist(Cell.at(0, 0));
		});
	});
});

