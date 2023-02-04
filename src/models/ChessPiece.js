// 0 = king
// 1 = queen
// 2 = bishop
// 3 = horse
// 4 = rook
// 5 = pawn
// 6 = lady
// 7 = archer

export default class ChessPiece {
    constructor(id, x, y, team) {
        this.id = id
        this.team = team
        this.x = x
        this.y = y
        this.alive = true
        this.moves = 0
    }

    getKillPossibilitiesLoop(team, { board, cases, xFunc, yFunc }) {
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

    getMovementPossibilitiesLoop(team, { board, cases, xFunc, yFunc }) {
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

    getKillPossibilities() {
        return []
    }

    getMovementsPossibilties() {
        return []
    }

    getPositionAfterKill(piece, killX, killY) {
        return { x: killX, y: killY }
    }
}