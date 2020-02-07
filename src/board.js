// TODO
const ChessUtils = require('./util/chess-utils');

const { WHITE, BLACK, EMPTY } = require('./util/chess-constants');
const PRIVATE = Symbol('PRIVATE');

class ChessBoard {
  constructor() {
    this[PRIVATE] = {
      board: new Array(128).fill(EMPTY),
    }
  }

  // Status:

  forEach(callback) {
    const { board } = this[PRIVATE];
    for (let i = 0; i < board.length; i++) {
      if (i & 0x88) {
        i += 7;
        continue;
      }

      const square = {
        piece: board[i],
        color: (i % 2) === 0 ? WHITE : BLACK,
      };

      callback(square, i);
    }
  }

  pieces() {
    const piecesOnBoard = [];

    this[PRIVATE].board.forEach(({ piece, color }) => {
      if (piece.type !== Chess.EMPTY) {
        piecesOnBoard.push(piece);
      }
    });

    return piecesOnBoard;
  }

  // Management:

  put(piece, square) {
    this[PRIVATE].board[square] = piece;
  }

  // TODO: Move `put` to here?

}

module.exports = ChessBoard;
