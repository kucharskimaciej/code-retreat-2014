var _ = require('lodash');
var should = require('chai').should();

var GameOfLife = require('../main.js');

describe('Game of Life', function () {

	it('is defined', function() {
		should.exist(GameOfLife);
	});

	it('exposes `new` that returns an instance', function () {
		var game = GameOfLife.new();
		should.exist(game);
	});

	describe('#at', function () {
		beforeEach(function() {
			this.game = GameOfLife.new();
		});

		it('game exposes `at` method that returns state of cell at coordinates', function () {
			should.equal( this.game.at(0, 0), false);
		});
	});

	describe('#spawn', function () {
		beforeEach(function() {
			this.game = GameOfLife.new();
		});

		it('game exposes `spawn` method that brings cell at coordinates to life', function () {
			this.game.spawn(0, 0);

			should.equal( this.game.at(0, 0), true );
			should.equal( this.game.at(0, 1), false);
		});
	});

	describe('#kill', function () {
		beforeEach(function() {
			this.game = GameOfLife.new();
		});

		it('game exposes `kill` method that kills cell at coordinates', function () {
			this.game.spawn(0, 0);
			this.game.kill(0, 0);

			should.equal( this.game.at(0, 0), false);
		});
	});

	describe('#tick', function () {
		beforeEach(function() {
			this.game = GameOfLife.new();
		});

		it('should exists', function() {
			should.exist(GameOfLife.new().tick);
		});
		it('should be a function', function () {
			GameOfLife.new().tick.should.be.an('function');
		});

		it('should kill cells that have N<2', function() {
			this.game.spawn(0, 0);
			this.game.spawn(0, 1);
			this.game.spawn(-1, 0);

			this.game.spawn(1, 10);

			this.game.tick();

			this.game.at(0, 0).should.be.ok;
			this.game.at(1, 10).should.not.be.ok;
		});

		it('should kill cells that have N>3', function() {
			this.game.spawn(0, 0);
			this.game.spawn(0, 1);
			this.game.spawn(0, -1);
			this.game.spawn(-1, 0);
			this.game.spawn(1, 1);

			this.game.tick();

			this.game.at(0, 0).should.not.be.ok;
		});

		it('revives a dead cell if it has N=3', function () {
			this.game.spawn(0, 0);
			this.game.spawn(0, 1);
			this.game.spawn(0, -1);

			this.game.tick();

			this.game.at(1, 0).should.be.ok;
		});

	});

	describe('#getCellsInProximity', function () {
		before(function() {
			this.game = GameOfLife.new();
		});

		it('is defined', function() {
			this.game.should.respondTo('getCellsInProximity');
		});
		it('return array of 9 tags', function() {
			var arr = this.game.getCellsInProximity('0,0');

			arr.length.should.eql(9);
		});
		it('returns correct tags', function() {
			var correctResult = [ '-1,-1', '-1,0', '-1,1', '0,-1', '0,0',
				'0,1', '1,-1', '1,0', '1,1' ];
			_.difference(this.game.getCellsInProximity('0,0'), correctResult).length.should.eql(0);
		});

	});

});


