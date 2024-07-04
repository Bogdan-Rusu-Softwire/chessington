import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Rook from "./rook";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    private addCastling(moveArray: any[], row: number, board: Board) {
        if (!this.isMoved && (board.getPiece((new Square(row, 7))) instanceof Rook &&
                board.getPiece(new Square(row, 7))?.isMoved == false) &&
            board.isReachable(new Square(row, 5)) &&
            board.isReachable(new Square(row, 6))) {
            moveArray.push(new Square(row, 6));
        }

        if (!this.isMoved && (board.getPiece((new Square(row, 0))) instanceof Rook &&
                board.getPiece(new Square(row, 0))?.isMoved == false) &&
            board.isReachable(new Square(row, 3)) &&
            board.isReachable(new Square(row, 2)) &&
            board.isReachable(new Square(row, 1))) {
            moveArray.push(new Square(row, 1));
        }
    }

    public getAvailableMoves(board: Board) {
        const currentSquare = board.findPiece(this);
        const moveArray = new Array(0);
        const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
        const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

        for (let index = 0; index < 8; index++) {
            const square: Square =  new Square(currentSquare.row + dx[index], currentSquare.col + dy[index]);
            if (board.isReachable(square) || board.isEnemyPiece(currentSquare, square))
                moveArray.push(square);
        }

        if (this.player == Player.WHITE)
            this.addCastling(moveArray, 0, board);
        else
            this.addCastling(moveArray, 7, board);

        return moveArray.filter(square => board.isInside(square));
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);

        if (this.player == Player.WHITE) {
            if (currentSquare.row == 0 && currentSquare.col == 4 && newSquare.row == 0 && newSquare.col == 6)
                board.moveTheRookForCastling(new Square(0, 7), new Square(0, 5));
            if (currentSquare.row == 0 && currentSquare.col == 4 && newSquare.row == 0 && newSquare.col == 1)
                board.moveTheRookForCastling(new Square(0, 0), new Square(0, 2));
        } else {
            if (currentSquare.row == 7 && currentSquare.col == 4 && newSquare.row == 7 && newSquare.col == 6)
                board.moveTheRookForCastling(new Square(7, 7), new Square(7, 5));
            if (currentSquare.row == 7 && currentSquare.col == 4 && newSquare.row == 7 && newSquare.col == 1)
                board.moveTheRookForCastling(new Square(7, 0), new Square(7, 2));
        }

        this.isMoved = true;
    }
}
