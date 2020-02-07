const Piece = require('./piece');
const ChessBoard = require('./board');
const FenReader = require('./util/fen-reader');
const ChessUtils = require('./util/chess-utils');
const ChessConstants = require('./util/chess-constants');

class Chess extends ChessConstants {

  moveNumber = 1;
  activeColor = Chess.WHITE;
  enPassantTarget = Chess.EMPTY;
  board = new ChessBoard();
  boardStatus = {
    [Chess.WHITE]: {
      kingPosition: Chess.EMPTY,
      castling: { [Chess.KING]: false, [Chess.QUEEN]: false }
    },
    [Chess.BLACK]: {
      kingPosition: Chess.EMPTY,
      castling: { [Chess.KING]: false, [Chess.QUEEN]: false }
    }
  };
  halfmoveClock = 0;
  history = [];
  pgnHeaders = {};

  // Instance Methods:
  constructor(fen) {
    super();
    this.load(typeof fen === 'string' ? fen : Chess.positions.gameStart);
  }

  // Board Management:
  clear(keepHead = false) {
    // TODO
  }

  load(fenString, keepHeaders = false) {
    const fen = new FenReader(fenString);

    this.clear(keepHeaders);

    this.activeColor = fen.activeColor;

    let square = 0;
    [...fen.piecePlacement].forEach(pieceChar => {
      if (pieceChar === '/') {
        square += 8;
        // Character is a single digit:
      } else if (/^\d$/.test(pieceChar)) {
        square += parseInt(pieceChar, 10);
      } else {
        this.put(Piece.fromFen(pieceChar), ChessUtils.algebraicSquare(square));
        square++;
      }
    });

    [Chess.WHITE, Chess.BLACK].forEach(color => {
      [Chess.KING, Chess.QUEEN].forEach(side => {
        this.boardStatus[color].castling[side] = fen.castlingAvailability[color][side];
      });
    });

    this.enPassantTarget = fen.enPassantTarget;
    this.halfmoveClock = fen.halfmoveClock;
    this.moveNumber = fen.moveNumber;

    //update_setup(generate_fen());

    return true;
  }

  // Board Management:
  put(piece, square) {

    if (!Chess.isValidSquare(square)) {
      return false;
    }

    square = Chess.SQUARES[square];

    // Only allow one king one the board:
    if (piece.type === Chess.KING &&
      this.boardStatus[piece.color].kingPosition !== Chess.EMPTY &&
      this.boardStatus[piece.color].kingPosition !== square) {
      return false;
    }

    this.board.put(piece, square);
    if (piece.type === Chess.KING) {
      this.boardStatus[piece.color].kingPositions = square;
    }

    // TODO
    // update_setup(generate_fen());
    return true;
  }

  // Game Status:
  availableMoves() {
    // TODO:
    return [];
  }

  hasMoves() {
    // TODO:
    return this.availableMoves().length > 0
  }

  kingAttacked() {
    // TODO
    return false;
  }

  inCheck() {
    return this.kingAttacked()
  }

  inCheckmate() {
    return this.inCheck() && !this.hasMoves();
  }

  inStalemate() {
    return !this.inCheck() && !this.hasMoves();
  }

  insufficientMaterial() {
    const pieces = this.board.pieces();

    // 2 Kings:
    if (pieces.length === 2 && pieces.every(({ type }) => type === Chess.KING)) return true;

    // 2 Kings + Bishop or Knight
    if (pieces.length === 3 &&
      pieces.every(({ type }) => (
        type === Chess.KING ||
        type === Chess.BISHOP ||
        type === Chess.KNIGHT
      ))) return true;

    // 2 Kings + 2 Bishops on the same color
    const bishopColors = pieces
      .filter(({ type }) => type === Chess.BISHOP)
      .map(piece => piece.color);

    // noinspection RedundantIfStatementJS
    if (
      pieces.length === 4 &&
      pieces.every(({ type }) => (type === Chess.KING || type === Chess.BISHOP)) &&
      bishopColors.every(color => color === bishopColors[0])
    ) return true;

    return false;
  }

  inThreefoldRepetition() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     */
    var moves = [];
    var positions = {};
    var repetition = false;

    while (true) {
      var move = undo_move();
      if (!move) break;
      moves.push(move);
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = generate_fen()
        .split(' ')
        .slice(0, 4)
        .join(' ');

      /* has the position occurred three or move times */
      positions[fen] = fen in positions ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }

      if (!moves.length) {
        break;
      }
      make_move(moves.pop());
    }

    return repetition;
  }

  get castlingAvailable() {
    return this[PRIVATE].castlingAvailable;
  }

  get enPassantTarget() {
    return this[PRIVATE].enPassantTarget;
  }

  // Chess Notation:

  toFEN() {
    let emptySquares = 0;
    let piecePlacement = '';

    this.board.forEach(({piece}, idx) => {

      const { type, color } = piece;

      if ((idx > 0) && (idx < 128) && (idx % 8 === 0)) {
        piecePlacement += `${emptySquares || ''}/`;
        emptySquares = 0;
      }

      if (piece === Chess.EMPTY) return emptySquares++;

      piecePlacement += emptySquares || '';
      emptySquares = 0;

      const pieceLetter = Chess.fenMapping[type];
      piecePlacement += color === Chess.WHITE ? pieceLetter.toUpperCase() : pieceLetter.toLowerCase();
    });

    let castlingAvailability = '';
    if (this.boardStatus[Chess.WHITE].castling[Chess.KING] === true) castlingAvailability += 'K';
    if (this.boardStatus[Chess.WHITE].castling[Chess.QUEEN] === true) castlingAvailability += 'Q';
    if (this.boardStatus[Chess.BLACK].castling[Chess.KING] === true) castlingAvailability += 'k';
    if (this.boardStatus[Chess.BLACK].castling[Chess.QUEEN] === true) castlingAvailability += 'q';
    castlingAvailability = castlingAvailability || '-';

    const activeColor = this.activeColor === Chess.WHITE ? 'w' : 'b';
    const enPassantTarget = this.enPassantTarget === Chess.EMPTY ? '-' : ChessUtils.algebraicSquare(this.enPassantTarget);

    return [piecePlacement, activeColor, castlingAvailability, enPassantTarget, this.halfmoveClock, this.moveNumber].join(' ');
  }

  toPGN() {
    // TODO
    return '';
  }
}

module.exports = Chess;
