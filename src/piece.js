const ChessConstants = require('./util/chess-constants');
const { isValidPiece, isValidColor } = ChessConstants;

const PRIVATE = Symbol('PRIVATE');

class Piece {
  constructor(type, color) {
    this[PRIVATE] = {};

    this.type = type;
    this.color = color;
  }

  set type(type) {
    if (this[PRIVATE].type) {
      throw `cannot modify existing piece`
    }
    if (!isValidPiece(type)) {
      throw `piece initialized with invalid type: ${type}`
    }
    this[PRIVATE].type = type;
  }

  get type() {
    return this[PRIVATE].type;
  }

  set color(color) {
    if (this[PRIVATE].color) {
      throw `cannot modify existing piece`
    }
    if (!isValidColor(color)) {
      throw `piece initialized with invalid color: ${color}`
    }
    this[PRIVATE].color = color;
  }

  get color() {
    return this[PRIVATE].color;
  }

  static fromFen(char) {
    const type = ChessConstants.fenMapping[char.toLowerCase()];
    const color = (char === char.toUpperCase() ? ChessConstants.WHITE : ChessConstants.BLACK);
    if (!type) {
      throw `incorrect fen piece character: '${char}`;
    }
    return new Piece(type, color);
  }
}

module.exports = Piece;
