const PRIVATE = Symbol('PRIVATE');

class Move {
  constructor(from, to) {
    if (!from || !to) throw "move not initialized";

    this[PRIVATE].from = from;
    this[PRIVATE].to = to;

    if(!this.inBoard()) throw "move outside board";

    // TODO: Save move attributes (is capturing, captured piece, en passant, etc.)
  }

  inBoard() {
    return !this.outOfBoard();
  }

  outOfBoard() {
    return this[PRIVATE].to & 0x88;
  }

}

module.exports = Move;
