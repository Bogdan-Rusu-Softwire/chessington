import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import King from "./pieces/king";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public isReachable(square: Square) {
        return this.isInside(square) &&  this.getPiece(square) == undefined;
    }

    public isEnemyPiece(source: Square, target: Square) {
        if (!this.isInside(target))
            return false;
        return !this.isReachable(target) && this.getPiece(target)?.player != this.getPiece(source)?.player && !this.isTargetKing(target);
    }

    public isTargetKing(square: Square) {
        return this.getPiece(square) instanceof King;
    }

    public isInside(square: Square) {
        return square.row >= 0 && square.row < 8 && square.col >= 0 && square.col < 8;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
