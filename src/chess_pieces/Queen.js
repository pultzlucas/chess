import ChessPiece from "../models/ChessPiece.js";

export default class Queen extends ChessPiece {
    constructor(x, y, color) {
        super(1, x, y, color)
    }

    getMovementPossibilities(piece, { board }) {
        const rightMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: 7 - this.x,
            xFunc: i => i + this.x + 1,
            yFunc: _ => this.y
        })

        const leftMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: this.x,
            xFunc: i => this.x - i - 1,
            yFunc: _ => this.y
        })

        const bottomMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: 7 - this.y,
            xFunc: _ => this.x,
            yFunc: i => i + this.y + 1
        })

        const topMoves = this.getPossibilitiesLoop(piece.color, {
            board,
            cases: this.y,
            xFunc: _ => this.x,
            yFunc: i => this.y - i - 1
        })

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

        return [
            ...rightMoves,
            ...leftMoves,
            ...bottomMoves,
            ...topMoves,
            ...rightBottomMoves,
            ...leftBottomMoves,
            ...rightTopMoves,
            ...leftTopMoves
        ]
    }
}
