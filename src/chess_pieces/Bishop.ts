import ChessGame from "../ChessGame.js";
import ChessPiece from "../models/ChessPiece.js";
import Movement from "../models/Position";

export default class Bishop extends ChessPiece {
    constructor(x: number, y: number, team: string) {
        super(2, x, y, team)
    }

    getKillPossibilities({ board }: ChessGame) {
       const rightBottomKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i: number) => i + this.x + 1,
            yFunc: (i: number) => i + this.y + 1
        })

        const leftBottomKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.x,
            xFunc: (i: number) => this.x - i - 1,
            yFunc: (i: number) => this.y + i + 1
        })

        const rightTopKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i: number) => i + this.x + 1,
            yFunc: (i: number) => this.y - i - 1
        })

        const leftTopKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.y,
            xFunc: (i: number) => this.x - i - 1,
            yFunc: (i: number) => this.y - i - 1
        })

        return [
            rightBottomKills,
            leftBottomKills,
            rightTopKills,
            leftTopKills
        ].filter(kill => kill) as Movement[]
    }

    getMovementPossibilities({ board }: ChessGame) {
        const rightBottomMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i: number) => i + this.x + 1,
            yFunc: (i: number) => i + this.y + 1
        })

        const leftBottomMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: this.x,
            xFunc: (i: number) => this.x - i - 1,
            yFunc: (i: number) => this.y + i + 1
        })

        const rightTopMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i: number) => i + this.x + 1,
            yFunc: (i: number) => this.y - i - 1
        })

        const leftTopMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: this.y,
            xFunc: (i: number) => this.x - i - 1,
            yFunc: (i: number) => this.y - i - 1
        })

        return [...rightBottomMoves, ...leftBottomMoves, ...rightTopMoves, ...leftTopMoves]
    }
}
