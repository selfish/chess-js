class ChessConstants {
  // Class Attributes:
  static WHITE = Symbol('WHITE');
  static BLACK = Symbol('BLACK');

  static EMPTY = Symbol('EMPTY');
  static KING = Symbol('KING');
  static QUEEN = Symbol('QUEEN');
  static ROOK = Symbol('ROOK');
  static BISHOP = Symbol('BISHOP');
  static KNIGHT = Symbol('KNIGHT');
  static PAWN = Symbol('PAWN');

  static fenMapping = {
    k: ChessConstants.KING,
    q: ChessConstants.QUEEN,
    r: ChessConstants.ROOK,
    b: ChessConstants.BISHOP,
    n: ChessConstants.KNIGHT,
    p: ChessConstants.PAWN,
    [ChessConstants.KING]: 'k',
    [ChessConstants.QUEEN]: 'q',
    [ChessConstants.ROOK]: 'r',
    [ChessConstants.BISHOP]: 'b',
    [ChessConstants.KNIGHT]: 'n',
    [ChessConstants.PAWN]: 'p',
  };

  static FILES = [...'abcdefgh'];
  static RANKS = [...'12345678'];

  static SQUARES = (
    ChessConstants.RANKS.reduce((squares, rank, rankIdx) =>
      ChessConstants.FILES.reduce((squares, file, fileIdx) =>
        Object.assign(squares, { [file + rank]: fileIdx + (rankIdx * 16) }), squares), {}));

  static positions = {
    gameStart: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  };

  static isValidSquare(square) {
    return ChessConstants.SQUARES.hasOwnProperty(square)
  }

  static isValidColor(color) {
    return ChessConstants.colors.includes(color)
  }

  static isValidPiece(piece) {
    return ChessConstants.pieces.includes(piece)
  }

  static isValidOrEmptyPiece(piece) {
    return piece === ChessConstants.EMPTY || ChessConstants.pieces.includes(piece)
  }

  static get pieces() {
    return [
      ChessConstants.KING,
      ChessConstants.QUEEN,
      ChessConstants.ROOK,
      ChessConstants.BISHOP,
      ChessConstants.KNIGHT,
      ChessConstants.PAWN,
    ];
  }

  static get colors() {
    return [
      ChessConstants.WHITE,
      ChessConstants.BLACK,
    ];
  }
}

module.exports = ChessConstants;
