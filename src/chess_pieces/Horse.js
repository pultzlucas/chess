import ChessPiece from "../models/ChessPiece.js";

export default class Horse extends ChessPiece {
    constructor(x, y, color) {
        super(3, x, y, color)
    }

    getMovementPossibilities({ board }) {
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
                if (otherPiece && this.color !== otherPiece.color) return true
                return !otherPiece
            })
    }
}
