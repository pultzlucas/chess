import ChessPiece from "../models/ChessPiece.js";

export default class Archer extends ChessPiece {
    constructor(x, y, team) {
        super(7, x, y, team)
    }

    getKillPossibilities({ board }) {
        return [
            { x: this.x + 2, y: this.team === 0 ? this.y + 3 : this.y - 3 }, // right
            { x: this.x - 2, y: this.team === 0 ? this.y + 3 : this.y - 3 }, // left
        ]
            .filter(({ x, y }) => {
                if (board.getPieceFromCaseCordenates(this.x, this.team === 0 ? this.y + 1 : this.y - 1)) return false
                const otherPiece = board.getPieceFromCaseCordenates(x, y)
                if (otherPiece && this.team !== otherPiece.team) return true
                return !otherPiece
            })
    }

    getMovementPossibilities({ board }) {
        return [
            { x: this.x - 1, y: this.y }, // left
            { x: this.x + 1, y: this.y }, // right
            { x: this.x, y: this.y - 1 }, // top
            { x: this.x, y: this.y + 1 }, // bottom
        ]
            .filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y))
    }

    getPositionAfterKill(piece) {
        return { x: piece.x, y: piece.y }
    }
}