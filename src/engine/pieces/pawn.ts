import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Queen from "./queen";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moveArray: any[] = new Array(0);
        if (this.player == Player.WHITE) {
            const dx = [1, 1];
            const dy = [-1, 1];
            for (let idx = 0; idx < dx.length; idx++) {
                const square: Square =  new Square(currentSquare.row + dx[idx], currentSquare.col + dy[idx]);
                if (board.isEnemyPiece(currentSquare, square))
                    moveArray.push(square);
            }
            if (!board.isReachable(new Square(currentSquare.row + 1, currentSquare.col)))
                return moveArray;
            if (currentSquare.row == 1 && board.isReachable(new Square(currentSquare.row + 2, currentSquare.col))) {
                moveArray.push(new Square(currentSquare.row + 2, currentSquare.col));
            }
            moveArray.push(new Square(currentSquare.row + 1, currentSquare.col));
        } else {
            const dx = [-1, -1];
            const dy = [-1, 1];
            for (let idx = 0; idx < dx.length; idx++) {
                const square: Square =  new Square(currentSquare.row + dx[idx], currentSquare.col + dy[idx]);
                if (board.isEnemyPiece(currentSquare, square))
                    moveArray.push(square);
            }
            if (!board.isReachable(new Square(currentSquare.row - 1, currentSquare.col)))
                return moveArray;
            if (currentSquare.row == 6 && board.isReachable(new Square(currentSquare.row - 2, currentSquare.col))) {
                moveArray.push(new Square(currentSquare.row - 2, currentSquare.col));
            }
            moveArray.push(new Square(currentSquare.row - 1, currentSquare.col));
        }

        return moveArray.filter(square => board.isInside(square));
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        if (newSquare.row == 0 || newSquare.row == 7) {
            let newQueen: Queen;
            if (this.player == Player.WHITE) {
                newQueen = new Queen(Player.WHITE);
            } else {
                newQueen = new Queen(Player.BLACK);
            }
            board.setPiece(newSquare, newQueen);
        }
    }
}
