const ChessConstants = require('./chess-constants');
const { RANKS, FILES } = ChessConstants;

class ChessUtils {

  static algebraicFile(square) {
    return FILES[square & 15];
  }

  static algebraicRank(square) {
    return RANKS[square >> 4]
  }

  static algebraicSquare(square) {
    return ChessUtils.algebraicFile(square) + ChessUtils.algebraicRank(square);
  }

}

module.exports = ChessUtils;
