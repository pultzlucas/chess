import ChessGame from "../ChessGame.js";
import ChessPiece from "../models/ChessPiece.js";

export default class Horse extends ChessPiece {
    constructor(x: number, y: number, team: number) {
        super(3, x, y, team)
    }

    getKillPossibilities({ board }: ChessGame) {
        return [
            { x: this.x - 2, y: this.y - 1 },
            { x: this.x - 2, y: this.y + 1 },

            { x: this.x + 2, y: this.y - 1 },
            { x: this.x + 2, y: this.y + 1 },

            { x: this.x + 1, y: this.y - 2 },
            { x: this.x - 1, y: this.y - 2 },

            { x: this.x + 1, y: this.y + 2 },
            { x: this.x - 1, y: this.y + 2 },
        ]
            .filter(({ x, y }) => {
                const otherPiece = board.getPieceFromCaseCordenates(x, y)
                if(otherPiece) return board.getPieceFromCaseCordenates(x, y) && this.team !== otherPiece.team
            })
    }

    getMovementPossibilities({ board }: ChessGame) {
        return [
            { x: this.x - 2, y: this.y - 1 },
            { x: this.x - 2, y: this.y + 1 },

            { x: this.x + 2, y: this.y - 1 },
            { x: this.x + 2, y: this.y + 1 },

            { x: this.x + 1, y: this.y - 2 },
            { x: this.x - 1, y: this.y - 2 },

            { x: this.x + 1, y: this.y + 2 },
            { x: this.x - 1, y: this.y + 2 },
        ]
            .filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y))
    }
}
