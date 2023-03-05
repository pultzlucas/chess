import ChessPiece from "../models/ChessPiece.js";
export default class King extends ChessPiece {
    constructor(x, y, team) {
        super(0, x, y, team);
    }
    getKillPossibilities({ board }) {
        return [
            { x: this.x - 1, y: this.y },
            { x: this.x + 1, y: this.y },
            { x: this.x, y: this.y - 1 },
            { x: this.x, y: this.y + 1 },
            { x: this.x - 1, y: this.y + 1 },
            { x: this.x + 1, y: this.y - 1 },
            { x: this.x - 1, y: this.y - 1 },
            { x: this.x + 1, y: this.y + 1 }, // bottom right
        ]
            .filter(({ x, y }) => {
            const otherPiece = board.getPieceFromCaseCordenates(x, y);
            if (otherPiece)
                return board.getPieceFromCaseCordenates(x, y) && this.team !== otherPiece.team;
        });
    }
    getMovementPossibilities({ board }) {
        return [
            { x: this.x - 1, y: this.y },
            { x: this.x + 1, y: this.y },
            { x: this.x, y: this.y - 1 },
            { x: this.x, y: this.y + 1 },
            { x: this.x - 1, y: this.y + 1 },
            { x: this.x + 1, y: this.y - 1 },
            { x: this.x - 1, y: this.y - 1 },
            { x: this.x + 1, y: this.y + 1 }, // bottom right
        ]
            .filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y));
    }
}
