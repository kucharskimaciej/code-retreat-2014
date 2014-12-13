var _ = require('lodash');
var should = require('should');

var Game = require('../main.js');

describe('Game', function () {
	it('is defined', function () {
		should.exist(Game);
	});

	it('is a constructor', function () {
		var game = new Game;

		should.exist(game);
	});

	describe('#board', function () {
		beforeEach(function () {
			this.game = new Game;
		});
		it('should be defined', function () {
			should.exist(this.game.board);
		});
		it('should be an array of arrays', function () {
			this.game.board.should.be.instanceof(Array);

			(this.game.board.length).should.be.above(0);

			this.game.board.forEach(function (subArr) {
				subArr.should.be.instanceof(Array);
				subArr.length.should.be.above(0);
			})
		});
	});

	describe('#spawn', function () {
		beforeEach(function () {
			this.game = new Game;
		});

		it('spawns cell at coords', function () {
			this.game.at(0,0).should.be.false;

			this.game.spawn(0, 0);

			this.game.at(0, 0).should.not.be.false;
		});
	});

	describe('#at', function () {
		beforeEach(function () {
			this.game = new Game;
		});

		it('gets status of a (dead) cell at coords', function () {
			this.game.at(0, 0).should.be.not.ok;
		});

		it('gets status of a (living) cell at coords', function () {
			this.game.spawn(0, 0);
			this.game.at(0, 0).should.be.ok;
		});

		it('should return false if the coords are out of bounds', function () {
			this.game.at(-100, 0).should.be.false;
			this.game.at(this.game.size, 0).should.be.false;
		});
	});
});

describe('Game rules(#tick)', function () {
	beforeEach(function () {
		this.game = new Game;
	});

	it('should kill cells with N < 2', function () {
		this.game.spawn(0, 0);

		this.game.tick();
		this.game.at(0, 0).should.be.not.ok;

	});

	it('should preserve cells with 2 <= N <= 3', function () {
		this.game.spawn(0, 0);
		this.game.spawn(0, 1);
		this.game.spawn(1, 0);

		this.game.tick();

		this.game.at(0, 0).should.be.ok;
	});

	it('should kill cells when N > 3', function () {
		this.game.spawn(0, 0);
		this.game.spawn(0, 1);
		this.game.spawn(1, 0);
		this.game.spawn(1, 1); // should be dead
		this.game.spawn(1, 2);

		this.game.tick();

		this.game.at(1, 1).should.not.be.ok;
	});

	it('should spawn new cells when N === 3', function () {
		this.game.spawn(0, 0);
		this.game.spawn(0, 1);
		this.game.spawn(1, 0);

		this.game.tick();

		this.game.at(1, 1).should.be.ok;
	});
});



