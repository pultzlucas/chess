import ChessGame from "../ChessGame.js";
import ChessPiece from "../models/ChessPiece.js";
import Movement from "../models/Position.js";

export default class Archer extends ChessPiece {
    private lastRoundAttacked: number | null

    constructor(x: number, y: number, team: number) {
        super(7, x, y, team)
        this.lastRoundAttacked = null
    }

    getKillPossibilities({ board, playerMoving }: ChessGame): Movement[] {
        if (this.lastRoundAttacked && playerMoving.moves !== this.lastRoundAttacked as number + 1) {
            this.lastRoundAttacked = null
            return []
        }

        return [
            { x: this.x + 2, y: this.team === 0 ? this.y + 3 : this.y - 3 }, // right
            { x: this.x - 2, y: this.team === 0 ? this.y + 3 : this.y - 3 }, // left
        ].filter(({ x, y }) => {
            if (board.getPieceFromCaseCordenates(this.x, this.team === 0 ? this.y + 1 : this.y - 1)) return false
            const otherPiece = board.getPieceFromCaseCordenates(x, y)
            if (otherPiece && this.team !== otherPiece.team) return true
            return !otherPiece
        })
    }

    getMovementPossibilities({ board }: ChessGame) {
        return [
            { x: this.x - 1, y: this.y }, // left
            { x: this.x + 1, y: this.y }, // right
            { x: this.x, y: this.y - 1 }, // top
            { x: this.x, y: this.y + 1 }, // bottom
        ].filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y))
    }

    getPositionAfterKill(piece: ChessPiece, x: number, y: number) {
        return { x: piece.x, y: piece.y }
    }

    executeAfterKill({ playerMoving }: ChessGame): void {
        this.lastRoundAttacked = playerMoving.moves
    }
}