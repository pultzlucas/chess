import ChessPiece from "../models/ChessPiece.js";

export default class Rook extends ChessPiece {
    constructor(x, y, team) {
        super(4, x, y, team)
    }

    getKillPossibilities({ board }) {
        const rightKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: i => i + this.x + 1,
            yFunc: _ => this.y
        })

        const leftKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.x,
            xFunc: i => this.x - i - 1,
            yFunc: _ => this.y
        })

        const bottomKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.y,
            xFunc: _ => this.x,
            yFunc: i => i + this.y + 1
        })

        const topKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.y,
            xFunc: _ => this.x,
            yFunc: i => this.y - i - 1
        })

        return [
            rightKills,
            leftKills,
            bottomKills,
            topKills,
        ].filter(kill => kill)
    }

    getMovementPossibilities({ board }) {
        const rightMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: 7 - this.x, 
            xFunc: i => i + this.x + 1,
            yFunc: _ => this.y
        })

        const leftMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: this.x, 
            xFunc: i => this.x - i - 1,
            yFunc: _ => this.y
        })

        const bottomMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: 7 - this.y, 
            xFunc: _ => this.x,
            yFunc: i => i + this.y + 1
        })

        const topMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: this.y, 
            xFunc: _ => this.x,
            yFunc: i => this.y - i - 1
        })

        return [...rightMoves, ...leftMoves, ...bottomMoves, ...topMoves]
    }
}
