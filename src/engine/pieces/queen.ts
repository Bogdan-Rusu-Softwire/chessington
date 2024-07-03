import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
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

        for (let row= currentSquare.row + 1; row < 8; row ++) {
            if (!board.isReachable(new Square(row, currentSquare.col)))
                break;
            moveArray.push(new Square(row, currentSquare.col));
        }

        for (let row= currentSquare.row - 1; row >= 0; row --) {
            if (!board.isReachable(new Square(row, currentSquare.col)))
                break;
            moveArray.push(new Square(row, currentSquare.col));
        }

        for (let col = currentSquare.col + 1; col < 8; col ++) {
            if (!board.isReachable(new Square(currentSquare.row, col)))
                break;
            moveArray.push(new Square(currentSquare.row, col));
        }

        for (let col = currentSquare.col - 1; col >= 0; col --) {
            if (!board.isReachable(new Square(currentSquare.row, col)))
                break;
            moveArray.push(new Square(currentSquare.row, col));
        }

        return moveArray;
    }
}
