export default class Player {
    constructor(color) {
        this.color = color
        this.moves = 0
        this.selectedPiece = null
    }

    selectPiece(piece) {
        this.selectedPiece = piece
    }

    moveSelectedPieceTo(board, x, y) {
        this.removePiece(board, this.selectedPiece)
        
        // If has enemy piece on case, removes it
        if(board.getPieceFromCaseCordenates(x, y)) {
            this.removePiece(board, board.getPieceFromCaseCordenates(x, y))
        }

        this.selectedPiece.x = x
        this.selectedPiece.y = y
        this.selectedPiece.moves++

        board.appendPiece(this.selectedPiece)

        this.moves++
    }

    removePiece(board, { x, y }) {
        board.pieceCases[y][x].piece = null
        board.getPieceCaseElement(x, y).firstChild.remove()
    }
}