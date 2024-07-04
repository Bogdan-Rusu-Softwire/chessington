import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMovesBeforeCheck(board: Board) {
        const currentSquare = board.findPiece(this);
        const dx = [-1, -1, 1, 1];
        const dy = [-1, 1, -1, 1];

        return this.getMovesInDirections(board, currentSquare, dx, dy);
    }
}
