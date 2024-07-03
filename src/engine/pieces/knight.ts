import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moveArray: any[] = new Array(0);

        const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
        const dy = [-1, -2, -2, -1, 1, 2, 2, 1];

        for (let index = 0; index < dx.length; index++) {
            moveArray.push(new Square(currentSquare.row + dx[index], currentSquare.col + dy[index]));
        }

        return moveArray;
    }
}
