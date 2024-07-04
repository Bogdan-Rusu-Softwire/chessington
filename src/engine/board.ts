import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import King from "./pieces/king";
import Pawn from "./pieces/pawn";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    private whiteIsInCheck: boolean = false;
    private blackIsInCheck: boolean = false;
    public whiteIsInCheckMate: boolean = false;
    public blackIsInCheckMate: boolean = false;

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

    public moveTheRookForCastling(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);
        this.setPiece(toSquare, movingPiece);
        this.setPiece(fromSquare, undefined);
    }

    private getKingPosition(): Square {
        for (let i = 0; i < 8; i++)
            for (let j = 0; j <  8; j++) {
                if (this.getPiece(Square.at(i, j)) instanceof King && this.getPiece(Square.at(i, j))?.player == this.currentPlayer) {
                    return Square.at(i, j);
                }
            }
        return Square.at(-1, -1);
    }

    private getPossibleAttackingPositionsToKing(kingPosition: Square): Square[] {
        if (kingPosition.col === -1 && kingPosition.row === -1)
            return new Array(0);
        const dx = [-1, 0, 1, -1, 1, -1, 0, 1, -2, -1, 1, 2, 2, 1, -1, -2];
        const dy = [-1, -1, -1, 0, 0, 1, 1, 1, -1, -2, -2, -1, 1, 2, 2, 1];
        const knightFlag = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];

        let possibleAttackingSquares: Square[] = Array(0);

        for (let index = 0; index < dx.length; index++) {
            let xPos = kingPosition.row + dx[index];
            let yPos = kingPosition.col + dy[index];
            while (this.isReachable(Square.at(xPos, yPos))) {
                xPos += dx[index];
                yPos += dy[index];

                if (knightFlag[index] == 1) {
                    break;
                }
            }


            if (this.isInside(Square.at(xPos, yPos))) {
                if (this.getPiece(Square.at(xPos, yPos))?.player != this.getPiece(kingPosition)?.player) {
                    // replace king with an undefined tile temporarily
                    let oldKing = this.getPiece(kingPosition);
                    let pawnTemp;
                    if (oldKing != undefined)
                        pawnTemp = new Pawn(oldKing?.player);
                    this.setPiece(kingPosition, pawnTemp);
                    let possibleAttackingPieceMoves = this.getPiece(Square.at(xPos, yPos))?.getAvailableMovesBeforeCheck(this);
                    this.setPiece(kingPosition, oldKing);

                    let exactAttackingPieces = possibleAttackingPieceMoves?.filter(position => (kingPosition.row == position.row && kingPosition.col == position.col));
                    if (exactAttackingPieces != undefined && exactAttackingPieces.length >= 1)
                        possibleAttackingSquares.push(Square.at(xPos, yPos));
                }
            }
        }

        return possibleAttackingSquares;
    }

    public getAllPiecesThatPutKingInCheck(): Square[] {
        return this.getPossibleAttackingPositionsToKing(this.getKingPosition());
    }

    public verifyIfCheckMate(): boolean {
        let cantMakeAnyMove = true;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.getPiece(Square.at(row, col))?.player == this.currentPlayer) {
                    let currentPiece = this.getPiece(Square.at(row, col));
                    if (currentPiece != undefined && currentPiece?.getAvailableMoves(this).length >= 1) {
                        cantMakeAnyMove = false;
                    }
                }
            }
        }

        return cantMakeAnyMove;
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }

        if (this.getAllPiecesThatPutKingInCheck().length > 0) {
            if (this.currentPlayer === Player.WHITE) {
                this.whiteIsInCheck = true;
                if (this.verifyIfCheckMate())
                    this.whiteIsInCheckMate = true;

            } else {
                this.blackIsInCheck = true;
                if (this.verifyIfCheckMate()) {
                    this.blackIsInCheckMate = true;
                }
            }
        } else {
            if (this.currentPlayer === Player.BLACK) {
                this.blackIsInCheck = false;
            } else {
                this.whiteIsInCheck = false;
            }
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
