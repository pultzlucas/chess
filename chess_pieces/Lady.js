import ChessPiece from "../models/ChessPiece.js";
import Queen from "./Queen.js";
export default class Bishop extends ChessPiece {
    constructor(x, y, team) {
        super(6, x, y, team);
        this.setTimesPermitedToActiveSpecial(1);
    }
    executeSpecialMode({ board }) {
        const piece = board.getPieceFromCaseCordenates(this.x, this.y);
        if (piece) {
            board.removePiece(piece);
            board.appendPiece(new Queen(this.x, this.y, this.team));
        }
    }
    getKillPossibilities({ board }) {
        let kills = [];
        const hasPieceOnLeft = board.getPieceFromCaseCordenates(this.x + 1, this.team === 0 ? this.y + 1 : this.y - 1);
        const hasPieceOnRight = board.getPieceFromCaseCordenates(this.x - 1, this.team === 0 ? this.y + 1 : this.y - 1);
        if (hasPieceOnLeft && hasPieceOnLeft.team !== this.team && !board.getPieceFromCaseCordenates(this.x + 2, this.team === 0 ? this.y + 2 : this.y - 2))
            kills.push({ x: this.x + 1, y: this.team === 0 ? this.y + 1 : this.y - 1 });
        if (hasPieceOnRight && hasPieceOnRight.team !== this.team && !board.getPieceFromCaseCordenates(this.x - 2, this.team === 0 ? this.y + 2 : this.y - 2))
            kills.push({ x: this.x - 1, y: this.team === 0 ? this.y + 1 : this.y - 1 });
        return kills;
    }
    getMovementPossibilities({ board }) {
        return [
            { x: this.x + 1, y: this.team === 0 ? this.y + 1 : this.y - 1 },
            { x: this.x - 1, y: this.team === 0 ? this.y + 1 : this.y - 1 }
        ].filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y));
    }
    getPositionAfterKill(piece, killX, killY) {
        if (piece.team === 1) {
            if (killX > piece.x) {
                return {
                    x: killX + 1,
                    y: killY - 1
                };
            }
            if (killX < piece.x) {
                return {
                    x: killX - 1,
                    y: killY - 1
                };
            }
        }
        if (piece.team === 0) {
            if (killX > piece.x) {
                return {
                    x: killX + 1,
                    y: killY + 1
                };
            }
            if (killX < piece.x) {
                return {
                    x: killX - 1,
                    y: killY + 1
                };
            }
        }
        return {};
    }
}
