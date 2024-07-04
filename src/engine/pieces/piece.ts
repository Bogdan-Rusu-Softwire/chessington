import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;

    public isMoved: boolean;

    public constructor(player: Player) {
        this.player = player;
        this.isMoved = false;
    }
    public getAvailableMoves(board: Board) {
        return this.getAvailableMovesBeforeCheck(board).filter(targetSquare => {
           let oldSquare = board.findPiece(this);
           let sourceOldPiece = this;
           let targetOldPiece = board.getPiece(targetSquare);
           board.setPiece(oldSquare, undefined);
           board.setPiece(targetSquare, sourceOldPiece);

           let isAllowedToMove: boolean;
           isAllowedToMove = board.getAllPiecesThatPutKingInCheck().length <= 0;

           board.setPiece(oldSquare, sourceOldPiece);
           board.setPiece(targetSquare, targetOldPiece);

           return isAllowedToMove;
        });
    }
    public getAvailableMovesBeforeCheck(board: Board): Square[] {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.isMoved = true;
    }
}
