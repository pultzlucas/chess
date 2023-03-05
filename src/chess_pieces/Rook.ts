import ChessGame from "../ChessGame.js";
import ChessPiece from "../models/ChessPiece.js";
import Position from "../models/Position.js"

export default class Rook extends ChessPiece {
    constructor(x: number, y: number, team: number) {
        super(4, x, y, team)
    }

    getKillPossibilities({ board }: ChessGame) {
        const rightKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i: number) => i + this.x + 1,
            yFunc: (_: number) => this.y
        })

        const leftKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.x,
            xFunc: (i: number) => this.x - i - 1,
            yFunc: (_: number) => this.y
        })

        const bottomKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.y,
            xFunc: (_: number) => this.x,
            yFunc: (i: number) => i + this.y + 1
        })

        const topKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.y,
            xFunc: (_: number) => this.x,
            yFunc: (i: number) => this.y - i - 1
        })

        return [
            rightKills,
            leftKills,
            bottomKills,
            topKills,
        ].filter(kill => kill) as Position[]
    }

    getMovementPossibilities({ board }: ChessGame) {
        const rightMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: 7 - this.x, 
            xFunc: (i: number) => i + this.x + 1,
            yFunc: (_: number) => this.y
        })

        const leftMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: this.x, 
            xFunc: (i: number) => this.x - i - 1,
            yFunc: (_: number) => this.y
        })

        const bottomMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: 7 - this.y, 
            xFunc: (_: number) => this.x,
            yFunc: (i: number) => i + this.y + 1
        })

        const topMoves = this.getMovementPossibilitiesLoop(this.team, {
            board, 
            cases: this.y, 
            xFunc: (_: number) => this.x,
            yFunc: (i: number) => this.y - i - 1
        })

        return [...rightMoves, ...leftMoves, ...bottomMoves, ...topMoves]
    }
}
