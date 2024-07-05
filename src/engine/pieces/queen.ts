import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMovesBeforeCheck(board: Board) {
        const currentSquare = board.findPiece(this);

        const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
        const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

        return this.getMovesInDirections(board, currentSquare, dx, dy);

    }
}
