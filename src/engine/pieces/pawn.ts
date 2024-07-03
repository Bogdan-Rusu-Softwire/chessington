import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        let newSquare: Square;
        if (this.player == Player.WHITE)
            newSquare = new Square(currentSquare.row + 1, currentSquare.col);
        else
            newSquare = new Square(currentSquare.row - 1, currentSquare.col);
        const moveArray: any[] = new Array(0);
        moveArray.push(newSquare);

        return moveArray;
    }
}
