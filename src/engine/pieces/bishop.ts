import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moveArray: any[] = new Array(0);
        for (let row = currentSquare.row + 1, col = currentSquare.col + 1 ; row < 8 && col < 8; row++, col++) {
            if (!board.isReachable(new Square(row, col)))
                break;
            moveArray.push(new Square(row, col));
        }

        for (let row = currentSquare.row - 1, col = currentSquare.col + 1 ; row >= 0 && col < 8; row--, col++) {
            if (!board.isReachable(new Square(row, col)))
                break;
            moveArray.push(new Square(row, col));
        }

        for (let row = currentSquare.row + 1, col = currentSquare.col - 1 ; row < 8 && col >= 0; row++, col--) {
            if (!board.isReachable(new Square(row, col)))
                break;
            moveArray.push(new Square(row, col));
        }

        for (let row = currentSquare.row - 1, col = currentSquare.col - 1 ; row >= 0 && col >= 0; row--, col--) {
            if (!board.isReachable(new Square(row, col)))
                break;
            moveArray.push(new Square(row, col));
        }

        return moveArray;
    }
}
