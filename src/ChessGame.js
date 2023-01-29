import Board from "./Board.js"
import King from "./chess_pieces/King.js"
import Queen from "./chess_pieces/Queen.js"
import Player from "./models/Player.js"

export default class ChessGame {
    constructor() {
        this.rounds = 0
        this.board = new Board(800)
        this.playerB = new Player(0)
        this.playerW = new Player(1)
        this.playerMoving = null
    }

    startGame() {
        this.playerMoving = this.playerW
        this.updatePlayerMovingPanel()
        this.board.placePiecesAtInitialPosition()

        // this.board.appendPiece(new King(4, 7, 1))
        // this.board.appendPiece(new King(4, 0, 0))
        // this.board.appendPiece(new Queen(3, 7, 1))
        // this.board.appendPiece(new Queen(3, 6, 1))
    }

    updatePlayerMovingPanel() {
        document.querySelector('.player-moving').textContent = this.playerMoving.getName()
    }

    changePlayerMoving() {
        this.playerMoving = this.playerMoving.color === 0 ? this.playerW : this.playerB
        this.updatePlayerMovingPanel()
    }

    endGame() {
       this.board.blockCases()

       document.querySelector('.check-match-message').classList.remove('hidden')
       document.querySelector('.background-shadow').classList.remove('hidden')
       document.querySelector('.player-winner').textContent = this.playerMoving.getName()
    }

    occuredCheckMatch() {
        return this.board.piecesAtBoard
            .filter(piece => piece.color === this.playerMoving.color)
            .map(piece => piece.getMovementPossibilities(this))
            .flat()
            .filter(mv => {
                const enemyKing = this.board.piecesAtBoard
                    .find(({ id, color }) => id === 0 && color !== this.playerMoving.color)
                return mv.x === enemyKing.x && mv.y === enemyKing.y
            }).length === 2
    }

    clickOverCaseEvent(e) {
        const pieceCaseEl = e.target.classList.contains('piece-case') ? e.target : e.target.parentNode

        if(pieceCaseEl.classList.contains('blocked')) return

        const x = Number(pieceCaseEl.getAttribute('x'))
        const y = Number(pieceCaseEl.getAttribute('y'))

        // If the clicked case has a mark, moves the piece selected to the case marked
        if (pieceCaseEl.querySelector('.piece-case-mark') && !pieceCaseEl.querySelector('.check')) {
            this.playerMoving.moveSelectedPieceTo(this.board, x, y)
            this.board.resetPossibleMoveCases()
            this.rounds++
            
            if(this.occuredCheckMatch()) {
                this.endGame()
                return
            }

            this.changePlayerMoving()
            return
        }

        const piece = this.board.getPieceFromCaseCordenates(x, y)

        // If the clicked case has a piece of player color, selects the piece
        if (piece) {
            if (this.playerMoving.color !== piece.color) return
            this.board.resetPossibleMoveCases()
            this.playerMoving.selectPiece(piece)
            this.board.showPossibleMoveCases(this, piece)
        }
    }
}