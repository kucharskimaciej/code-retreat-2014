var _ = require('lodash');
var should = require('should');

var Game = require('../main.js');

function setup ( ) {
	this.game = new Game;
}
describe('Game', function () {

	describe('#at', function () {
		beforeEach(setup);

		it('returns false when called with coords of dead cell', function () {
			// all cells are dead in the beginning
			this.game.at(0,0).should.be.false;
		});

		it('returns true when called for living cell', function () {
			this.game.spawn(0, 0).at(0, 0).should.be.true;
		});

		it('returns false when called for wrong coords', function () {
			this.game.at(-10, 0).should.be.false;
			this.game.at(0, 12).should.be.false;
		});
	});

	describe('#spawn', function () {
		beforeEach(setup);
		it('spawns cells at coords', function () {
			this.game.spawn(0, 0).at(0, 0).should.be.true;
		});

		it('should throw for wrong coords', function () {
			var game = this.game;
			should(function () {
				game.spawn(-100,0);
			}).throw();
		});

		it('returns new game instance (immutability)', function () {
			var newGame = this.game.spawn(1,1);

			this.game.at(1,1).should.be.false;
			should.notEqual(this.game, newGame);
		});
	});

	describe('#tick', function () {
	    beforeEach(setup);
		it('returns new game instace', function () {
			var nGame = this.game.tick();

			should.notEqual(nGame, this.game);
		});
	});

});

describe('Game rules', function () {

	beforeEach(setup);

	it('cells with N < 2 should die', function () {
		this.game
			.spawn(0, 0)
			.tick()
			.at(0, 0)
			.should.be.false;
	});

	it('cells with N > 3 should die', function () {
		this.game
			.spawn(0, 0)
			.spawn(0, 1)
			.spawn(1, 1)
			.spawn(1, 0)
			.spawn(2, 1)
			.tick()
			.at(1, 1)
			.should.be.false;
	});

	it('cells with N == 2 should survive', function () {
		this.game
			.spawn(1, 1)
			.spawn(0, 0)
			.spawn(0, 1)
			.tick()
			.at(1, 1)
			.should.be.true;
	});

	it('cells with N == 3 should survive', function () {
		this.game
			.spawn(1, 1)
			.spawn(0, 0)
			.spawn(0, 1)
			.spawn(1, 0)
			.tick()
			.at(1, 1)
			.should.be.true;
	});

	it('cells with N == 3 should be born', function () {
		this.game
			.spawn(0, 0)
			.spawn(0, 1)
			.spawn(1, 0)
			.tick()
			.at(1, 1)
			.should.be.true;
	});
});