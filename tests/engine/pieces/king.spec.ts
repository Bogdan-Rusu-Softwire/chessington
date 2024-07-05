import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from "../../../src/engine/pieces/rook";
import Bishop from "../../../src/engine/pieces/bishop";
import Queen from "../../../src/engine/pieces/queen";

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());



    it('cannot make castling', () => {
        const king: King = new King(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);

        const rook: Rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0, 7), rook);

        const bishop: Bishop = new Bishop(Player.WHITE);
        board.setPiece(Square.at(0, 5), bishop);

        const moves = king.getAvailableMoves(board);

        const expectedCastling = [Square.at(0, 6)];

        moves.should.not.deep.include.members(expectedCastling);
    });

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('can make castling', () => {
        const king: King = new King(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);

        const rook: Rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0, 7), rook);

        const moves = king.getAvailableMoves(board);

        const expectedCastling = [Square.at(0, 6)];

        moves.should.deep.include.members(expectedCastling);
    });

    it('cannot move to position in check if is in check', () => {
        const king: King = new King(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);

        const rook: Rook = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 7), rook);

        const moves = king.getAvailableMoves(board);

        const expectedCastling = [Square.at(0, 5), Square.at(0, 3)];

        moves.should.not.deep.include.members(expectedCastling);
    });

    it('can overtake opposing piece if in check', () => {
        const king: King = new King(Player.WHITE);
        board.setPiece(Square.at(0, 6), king);

        const rook: Rook = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 7), rook);

        const moves = king.getAvailableMoves(board);

        const expectedCastling = [Square.at(0, 7)];

        moves.should.deep.include.members(expectedCastling);
    });

    it('can move allied piece in front of opposing piece if in check', () => {
        const king: King = new King(Player.WHITE);
        board.setPiece(Square.at(0, 4), king);

        const queen: Queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(2, 4), queen);

        const rook: Rook = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 7), rook);

        const moves = queen.getAvailableMoves(board);

        const expectedCastling = [Square.at(0, 6)];

        moves.should.deep.include.members(expectedCastling);
    });

    it('black is in checkmate', () => {
        board.currentPlayer = Player.BLACK;
        const king: King = new King(Player.WHITE);
        board.setPiece(Square.at(5, 4), king);

        const queen: Queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(1, 4), queen);

        const rook: Rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0, 7), rook);

        const blackKing: King = new King(Player.BLACK);
        board.setPiece(Square.at(0, 0), blackKing);

        const moves = blackKing.getAvailableMoves(board);
        // console.log(blackKing.getAvailableMoves(board));
        // console.log(board.currentPlayer);
        board.verifyIfCheckMate().should.be.equal(true);
    });

    it('black cannot move in check', () => {
        board.currentPlayer = Player.BLACK;
        const king: King = new King(Player.BLACK);
        board.setPiece(Square.at(6, 4), king);

        const pawnWhite1: Pawn = new Pawn(Player.WHITE);
        board.setPiece(Square.at(3, 4), pawnWhite1);

        const pawnWhite2: Pawn = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 3), pawnWhite2);

        const pawnBlack1: Pawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), pawnBlack1);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(5, 4)];
        moves.should.not.deep.include.members(expectedMoves);
    });
});
