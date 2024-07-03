import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moveArray = new Array(0);
        const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
        const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

        for (let index = 0; index < 8; index++) {
            moveArray.push(new Square(currentSquare.row + dx[index], currentSquare.col + dy[index]));
        }

        return moveArray;
    }
}
