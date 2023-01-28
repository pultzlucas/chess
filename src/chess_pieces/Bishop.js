import ChessPiece from "../models/ChessPiece.js";

export default class Bishop extends ChessPiece {
    constructor(x, y, color) {
        super(2, x, y, color)
    }

    getMovementPossibilities(piece, { board }) {
        const rightBottomMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: 7 - this.x,
            xFunc: i => i + this.x + 1,
            yFunc: i => i + this.y + 1
        })

        const leftBottomMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: this.x,
            xFunc: i => this.x - i - 1,
            yFunc: i => this.y + i + 1
        })

        const rightTopMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: 7 - this.x,
            xFunc: i => i + this.x + 1,
            yFunc: i => this.y - i - 1
        })

        const leftTopMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: this.y,
            xFunc: i => this.x - i - 1,
            yFunc: i => this.y - i - 1
        })

        return [...rightBottomMoves, ...leftBottomMoves, ...rightTopMoves, ...leftTopMoves]
    }
}
