import ChessPiece from "../models/ChessPiece.js";
export default class Archer extends ChessPiece {
    lastRoundAttacked;
    constructor(x, y, team) {
        super(7, x, y, team);
        this.lastRoundAttacked = null;
    }
    getKillPossibilities({ board, playerMoving }) {
        if (this.lastRoundAttacked && playerMoving.moves !== this.lastRoundAttacked + 1) {
            this.lastRoundAttacked = null;
            return [];
        }
        return [
            { x: this.x + 2, y: this.team === 0 ? this.y + 3 : this.y - 3 },
            { x: this.x - 2, y: this.team === 0 ? this.y + 3 : this.y - 3 }, // left
        ].filter(({ x, y }) => {
            if (board.getPieceFromCaseCordenates(this.x, this.team === 0 ? this.y + 1 : this.y - 1))
                return false;
            const otherPiece = board.getPieceFromCaseCordenates(x, y);
            if (otherPiece && this.team !== otherPiece.team)
                return true;
            return !otherPiece;
        });
    }
    getMovementPossibilities({ board }) {
        return [
            { x: this.x - 1, y: this.y },
            { x: this.x + 1, y: this.y },
            { x: this.x, y: this.y - 1 },
            { x: this.x, y: this.y + 1 }, // bottom
        ].filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y));
    }
    getPositionAfterKill(piece, x, y) {
        return { x: piece.x, y: piece.y };
    }
    executeAfterKill({ playerMoving }) {
        this.lastRoundAttacked = playerMoving.moves;
    }
}
