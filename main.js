var _ = require('lodash');


var Game = (function () {
	var Game = function () {
		this.size = 10;
		this.board = this.createBoard(this.size);
	};

	Game.prototype.createBoard = function (size) {
	    var board = [];
		for (var i = 0; i< size; i++) {
			board[i] = [];
			for(var j = 0; j < size; j++) {
				board[i][j] = false;
			}
		}

		return board;
	};

	Game.prototype.at = function (x, y) {
		if(x < 0 || x >= this.size) return false;
	    return !!this.board[x][y];
	};

	Game.prototype.spawn = function (x, y) {
	    this.board[x][y] = true;
	};

	Game.prototype.getNCount = function (rI, cI) {
		var nCount = 0;
		if(this.at(rI+1, cI+1)) nCount++;
		if(this.at(rI+1, cI)) nCount++;
		if(this.at(rI+1, cI-1)) nCount++;
		if(this.at(rI, cI+1)) nCount++;
		if(this.at(rI, cI-1)) nCount++;
		if(this.at(rI-1, cI+1)) nCount++;
		if(this.at(rI-1, cI)) nCount++;
		if(this.at(rI-1, cI-1)) nCount++;

		return nCount;
	};

	Game.prototype.tick = function () {
		var newBoard = this.createBoard(this.size);

		this.board.forEach(function (row, rI) {
			row.forEach(function (cell, cI) {
				var nCount = this.getNCount(rI, cI);

				if( this.at(rI, cI) &&
					(nCount === 2 || nCount === 3)) {
					newBoard[rI][cI] = true;
				}

				if(!this.at(rI, cI) && nCount === 3) {
					newBoard[rI][cI] = true;
				}

			}, this);
		}, this);

		this.board = newBoard;
	};


	return Game;

}());



module.exports = Game;