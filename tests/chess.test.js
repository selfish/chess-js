const Chess = require('../src/chess');

describe('Load and generate FEN', () => {
  const fens = [
    Chess.positions.gameStart,
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
  ];

  fens.forEach(fen => {
    it('Loads FEN then generates the same FEN: ' + fen, () => {
      const expected = fen;
      const chess = new Chess(expected);
      const actual = chess.toFEN();

      expect(actual).toEqual(expected);
    })
  });

  it('Loads default FEN then generates the same FEN', () => {
    const expected = Chess.positions.gameStart;
    const chess = new Chess();
    const actual = chess.toFEN();

    expect(actual).toEqual(expected);
  })
});
