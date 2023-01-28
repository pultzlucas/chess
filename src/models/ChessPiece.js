// 0 = king
// 1 = queen
// 2 = bishop
// 3 = horse
// 4 = rook
// 5 = pawn

export default class ChessPiece {
    constructor(id, x, y, color) {
        this.id = id
        this.color = color
        this.x = x
        this.y = y
        this.alive = true
        this.moves = 0
    }

    getPossibilitiesLoop(color, { board, cases, xFunc, yFunc }) {
        let moves = []
        for (let i in new Array(cases).fill(null)) {
            const cord = {
                x: xFunc(Number(i)),
                y: yFunc(Number(i))
            }

            const piece = board.getPieceFromCaseCordenates(cord.x, cord.y)

            if(piece) {
                if(piece.color === color) break

                moves.push(cord)
                break
            }

            moves.push(cord)
        }

        return moves
    }
}