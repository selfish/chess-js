const { SQUARES, WHITE, BLACK, KING, QUEEN, EMPTY } = require('./chess-constants');

const PRIVATE = Symbol('PRIVATE');

class FenReader {
  static fenRegex = /\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw-]\s(([a-hkqA-HKQ]{1,4})|(-))\s(([a-h][36])|(-))\s\d+\s\d+\s*/;

  constructor(fenString) {
    if (!FenReader.validateFen) {
      throw "invalid fen"
    }

    this[PRIVATE] = { fenString };
    this.parseFenString();
  }

  parseFenString() {
    const fenTokens = this[PRIVATE].fenString.trim().split(/\s+/);

    const [
      piecePlacement,
      activeColor,
      castlingAvailability,
      enPassantTarget,
      halfmoveClock,
      moveNumber
    ] = fenTokens;

    this[PRIVATE].piecePlacement = piecePlacement;
    this[PRIVATE].activeColor = activeColor === 'w' ? WHITE : BLACK;
    this[PRIVATE].castlingAvailability = {
      [WHITE]: { [KING]: castlingAvailability.includes('K'), [QUEEN]: castlingAvailability.includes('Q') },
      [BLACK]: { [KING]: castlingAvailability.includes('k'), [QUEEN]: castlingAvailability.includes('q') },
    };
    this[PRIVATE].enPassantTarget = (enPassantTarget === '-' ? EMPTY : SQUARES[enPassantTarget]);
    this[PRIVATE].halfmoveClock = halfmoveClock;
    this[PRIVATE].moveNumber = moveNumber;
  }

  get piecePlacement() {
    return this[PRIVATE].piecePlacement
  }

  get activeColor() {
    return this[PRIVATE].activeColor
  }

  get castlingAvailability() {
    return this[PRIVATE].castlingAvailability
  }

  get enPassantTarget() {
    return this[PRIVATE].enPassantTarget
  }

  get halfmoveClock() {
    return this[PRIVATE].halfmoveClock
  }

  get moveNumber() {
    return this[PRIVATE].moveNumber
  }

  toObject() {
    // TODO;
    return {};
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  toString() {
    return this[PRIVATE].fenString;
  }

  static validateFen(fen) {
    // Naive implementation, structure only:
    return FenReader.fenRegex.test(fen);
  }
}

module.exports = FenReader;
