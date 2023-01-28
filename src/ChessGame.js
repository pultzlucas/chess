import Board from "./models/Board.js"
import Bishop from "./chess_pieces/Bishop.js"
import Pawn from "./chess_pieces/Pawn.js"
import Rook from "./chess_pieces/Rook.js"
import Queen from "./chess_pieces/Queen.js"
import King from "./chess_pieces/King.js"
import Horse from "./chess_pieces/Horse.js"
import Player from "./models/Player.js"

export default class ChessGame {
    constructor() {
        this.rounds = 0
        this.board = new Board(600)

        this.playerB = new Player(0)
        this.playerW = new Player(1)

        this.playerMoving = null
    }

    startGame() {
        this.playerMoving = this.playerW
        this.board.placePiecesAtInitialPosition()
    }

    clickOverCaseEvent(e) {
        const pieceCaseEl = e.target.classList.contains('piece-case') ? e.target : e.target.parentNode
        const x = Number(pieceCaseEl.getAttribute('x'))
        const y = Number(pieceCaseEl.getAttribute('y'))

        // If the clicked case has a mark, moves the piece selected to the case marked
        if (pieceCaseEl.querySelector('.piece-case-mark') && !pieceCaseEl.querySelector('.check')) {
            this.playerMoving.moveSelectedPieceTo(this.board, x, y)
            this.board.resetPossibleMoveCases()
            this.rounds++
            return
        }
        
        this.board.resetPossibleMoveCases()

        // If the clicked case has a piece, selects the piece
        const casePiece = this.board.getPieceFromCaseCordenates(x, y)
        if (casePiece) {
            this.playerMoving.selectPiece(casePiece)
            this.board.showPossibleMoveCases(this, casePiece)
        }
    }
}