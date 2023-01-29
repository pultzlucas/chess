import ChessPiece from "../models/ChessPiece.js";

export default class Rook extends ChessPiece {
    constructor(x, y, color) {
        super(4, x, y, color)
    }

    getMovementPossibilities({ board }) {
        const rightMoves = this.getPossibilitiesLoop(this.color, {
            board, 
            cases: 7 - this.x, 
            xFunc: i => i + this.x + 1,
            yFunc: _ => this.y
        })

        const leftMoves = this.getPossibilitiesLoop(this.color, {
            board, 
            cases: this.x, 
            xFunc: i => this.x - i - 1,
            yFunc: _ => this.y
        })

        const bottomMoves = this.getPossibilitiesLoop(this.color, {
            board, 
            cases: 7 - this.y, 
            xFunc: _ => this.x,
            yFunc: i => i + this.y + 1
        })

        const topMoves = this.getPossibilitiesLoop(this.color, {
            board, 
            cases: this.y, 
            xFunc: _ => this.x,
            yFunc: i => this.y - i - 1
        })

        return [...rightMoves, ...leftMoves, ...bottomMoves, ...topMoves]
    }
}
