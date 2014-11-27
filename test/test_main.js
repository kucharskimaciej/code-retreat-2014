var _ = require('lodash');
var should = require('chai').should();

var Cell = require('../main.js').Cell;




describe('Cell', function () {
	it('should be defined', function () {
		should.exist(Cell)
	});

	it('can be instantinated', function () {
		var cell = new Cell;
		Cell.should.be.ok;
	});

	describe(':at', function () {
		it('is exposed by Cell class', function () {
			Cell.at.should.be.a('function')
		});

		it('should return false/true, depending on state of cell on coords', function () {
			Cell.at(0, 0).should.eql(false);
		});
	});

	describe(':reset', function () {
		it('is defined', function () {
			Cell.reset.should.be.a('function');
		});

		it('should kill all living cells resetting the game state', function () {
			new Cell(0, 0);
			Cell.at(0,0).should.be.ok;
			Cell.reset();
			Cell.at(0,0).should.be.not.ok;
		});
	});

	describe('creating new cell', function () {
		it('should know it\'s coords', function () {
			var cell = new Cell(0, 0);
			cell.x.should.eql(0);
			cell.y.should.eql(0);
		});

		it('should be detectable', function () {
			new Cell(1, 1);

			Cell.at(1,1).should.be.ok;
		});
	});
	


	describe('#die', function () {
		it('should be defined', function () {
			var cell = new Cell(0, 0);
			cell.should.respondTo('die');
		});

		it('should remove cell from game', function () {
			var cell = new Cell(0, 0);

			Cell.at(0,0).should.be.ok;

			cell.die();
			Cell.at(0,0).should.be.not.ok;

		});
	});

	describe(':advance', function () {
		beforeEach(function () {
			Cell.reset();
		});

		it('should be available', function () {
			Cell.advance.should.be.a('function');
		});

		it('should kill cells that have N < 2', function () {
			new Cell(0, 0);
			Cell.advance();

			Cell.at(0, 0).should.be.not.ok;
		});

		it('should perserve cells that have 2 <= N <= 3', function () {
			new Cell(0, 0);
			new Cell(0, 1);
			new Cell(1, 0);

			Cell.advance();
			Cell.at(0, 0).should.be.ok;


		});

		it('should spawn new cells when they have N=3', function () {
			new Cell(0, -1);
			new Cell(0, 0);
			new Cell(0, 1);

			Cell.advance();
			Cell.at(1, 0).should.be.ok;
		})

		it('should kill and spawn cells simultaneously', function () {
			new Cell(0, -1);
			new Cell(0, 0);
			new Cell(0, 1);

			Cell.advance();
			Cell.at(1, 0).should.be.ok;
			Cell.at(0, 1).should.be.not.ok;
		})
	});
});


