import ChessPiece from "../models/ChessPiece.js";
export default class Bishop extends ChessPiece {
    constructor(x, y, team) {
        super(2, x, y, team);
    }
    getKillPossibilities({ board }) {
        const rightBottomKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i) => i + this.x + 1,
            yFunc: (i) => i + this.y + 1
        });
        const leftBottomKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.x,
            xFunc: (i) => this.x - i - 1,
            yFunc: (i) => this.y + i + 1
        });
        const rightTopKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i) => i + this.x + 1,
            yFunc: (i) => this.y - i - 1
        });
        const leftTopKills = this.getKillPossibilitiesLoop(this.team, {
            board,
            cases: this.y,
            xFunc: (i) => this.x - i - 1,
            yFunc: (i) => this.y - i - 1
        });
        return [
            rightBottomKills,
            leftBottomKills,
            rightTopKills,
            leftTopKills
        ].filter(kill => kill);
    }
    getMovementPossibilities({ board }) {
        const rightBottomMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i) => i + this.x + 1,
            yFunc: (i) => i + this.y + 1
        });
        const leftBottomMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: this.x,
            xFunc: (i) => this.x - i - 1,
            yFunc: (i) => this.y + i + 1
        });
        const rightTopMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: 7 - this.x,
            xFunc: (i) => i + this.x + 1,
            yFunc: (i) => this.y - i - 1
        });
        const leftTopMoves = this.getMovementPossibilitiesLoop(this.team, {
            board,
            cases: this.y,
            xFunc: (i) => this.x - i - 1,
            yFunc: (i) => this.y - i - 1
        });
        return [...rightBottomMoves, ...leftBottomMoves, ...rightTopMoves, ...leftTopMoves];
    }
}
