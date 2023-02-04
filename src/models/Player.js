import Graveyard from "./Graveyard.js"

export default class Player {
    constructor(team) {
        this.team = team
        this.moves = 0
        this.selectedPiece = null
        this.graveyard = new Graveyard(team)
    }

    getName() {
        return this.team === 0 ? 'black' : 'white'
    }

    selectPiece(piece) {
        this.selectedPiece = piece
    }

    killEnemyPiece(board, { x, y }) {
        const pieceToKill = board.getPieceFromCaseCordenates(x, y)
        this.graveyard.appendPiece(pieceToKill)
        const positionAfterKill = this.selectedPiece.getPositionAfterKill(this.selectedPiece, x, y)
        board.removePiece(pieceToKill)
        this.moveSelectedPieceTo(board, positionAfterKill.x, positionAfterKill.y)
    }

    moveSelectedPieceTo(board, x, y) {
        board.removePiece(this.selectedPiece)

        this.selectedPiece.x = x
        this.selectedPiece.y = y

        this.selectedPiece.moves++
        board.appendPiece(this.selectedPiece)
        this.moves++
    }
}