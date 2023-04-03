// 0 = king
// 1 = queen
// 2 = bishop
// 3 = horse
// 4 = rook
// 5 = pawn
// 6 = lady
// 7 = archer
// 8 = death

import Board from "../Board.js"
import ChessGame from "../ChessGame.js"
import Position from "../models/Position.js"

export default class ChessPiece {
    team: string
    id: number
    x: number
    y: number
    alive: boolean
    moves: number
    specialModeIsActived: boolean
    timesActivedSpecial: number
    timesPermitedToActiveSpecial: number
    graveyardId: number | null

    constructor(id: number, x: number, y: number, team: string) {
        this.id = id
        this.team = team
        this.x = x
        this.y = y
        this.alive = true
        this.moves = 0
        this.timesActivedSpecial = 0
        this.timesPermitedToActiveSpecial = 0
        this.specialModeIsActived = false
        this.graveyardId = null
    }

    setTimesPermitedToActiveSpecial(times: number) {
        this.timesPermitedToActiveSpecial = times
    }

    checkIfSpecialModeCanBeActived() {
        return (this.team === 'black' && this.y === 7 || this.team === 'white' && this.y === 0) 
        && (this.timesPermitedToActiveSpecial > this.timesActivedSpecial)
    }

    getKillPossibilitiesLoop(team: string, { board, cases, xFunc, yFunc }: {
        board: Board
        cases: number,
        xFunc: Function
        yFunc: Function
    }) {
        for (let i in new Array(cases).fill(null)) {
            const cord = {
                x: xFunc(Number(i)),
                y: yFunc(Number(i))
            }

            const piece = board.getPieceFromCaseCordenates(cord.x, cord.y)
            if (piece) {
                if (piece.team === team) break
                return cord
            }
        }
    }

    getMovementPossibilitiesLoop(team: string, { board, cases, xFunc, yFunc }: {
        board: Board
        cases: number,
        xFunc: Function
        yFunc: Function
    }) {
        let moves = []
        for (let i in new Array(cases).fill(null)) {
            const cord = {
                x: xFunc(Number(i)),
                y: yFunc(Number(i))
            }

            const piece = board.getPieceFromCaseCordenates(cord.x, cord.y)
            if (piece) break
            moves.push(cord)
        }

        return moves
    }

    getKillPossibilities(game: ChessGame): Position[] {
        return []
    }

    getMovementPossibilities(game: ChessGame): Position[] {
        return []
    }

    getPositionAfterKill(piece: ChessPiece, killX: number, killY: number): Position {
        return { x: killX, y: killY }
    }

    executeSpecialMode(game: ChessGame){}

    executeAfterKill(game: ChessGame) {}
}