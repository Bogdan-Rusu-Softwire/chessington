import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moveArray: any[] = new Array(0);

        for (let row = 0; row < 8; row ++) {
            if (row == currentSquare.row)
                continue;
            moveArray.push(new Square(row, currentSquare.col));
        }

        for (let col = 0; col < 8; col ++) {
            if (col == currentSquare.col)
                continue;
            moveArray.push(new Square(currentSquare.row, col));
        }

        return moveArray;
    }
}
