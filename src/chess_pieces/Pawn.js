import ChessPiece from "../models/ChessPiece.js";

export default class Pawn extends ChessPiece {
    constructor(x, y, team) {
        super(5, x, y, team)
    }

    getKillPossibilities({ board }) {
        let kills = []

        if (this.team === 0) {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y + 1)
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y + 1)

            if (rightEnemyPiece && this.team !== rightEnemyPiece.team) {
                kills.push({ x: this.x + 1, y: this.y + 1 })
            }

            if (leftEnemyPiece && this.team !== leftEnemyPiece.team) {
                kills.push({ x: this.x - 1, y: this.y + 1 })
            }
        }

        if (this.team === 1) {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y - 1)
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y - 1)

            if (rightEnemyPiece && this.team !== rightEnemyPiece.team) {
                kills.push({ x: this.x + 1, y: this.y - 1 })
            }

            if (leftEnemyPiece && this.team !== leftEnemyPiece.team) {
                kills.push({ x: this.x - 1, y: this.y - 1 })
            }
        }

        return kills
    }

    getMovementPossibilities({ board }) {
        const movements = () => {
            if (this.team === 0) {
                if (this.moves === 0) {
                    return [{ x: this.x, y: this.y + 1 }, { x: this.x, y: this.y + 2 }]
                }

                return [{ x: this.x, y: this.y + 1 }]
            }

            if (this.team === 1) {
                if (this.moves === 0) {
                    return [{ x: this.x, y: this.y - 1 }, { x: this.x, y: this.y - 2 }]
                }

                return [{ x: this.x, y: this.y - 1 }]
            }
        }

        return movements().filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y))
    }
}