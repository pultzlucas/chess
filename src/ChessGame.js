import Board from "./Board.js"
import King from "./chess_pieces/King.js"
import Lady from "./chess_pieces/Lady.js"
import Queen from "./chess_pieces/Queen.js"
import Player from "./models/Player.js"

export default class ChessGame {
    constructor() {
        this.rounds = 0
        this.board = new Board(700)
        this.playerB = new Player(0)
        this.playerW = new Player(1)
        this.playerMoving = null
    }

    startGame() {
        this.playerMoving = this.playerW
        this.updatePlayerMovingPanel()
        this.board.placePiecesAtInitialPosition()
    }

    updatePlayerMovingPanel() {
        document.querySelector('.player-moving').textContent = this.playerMoving.getName()
    }

    changePlayerMoving() {
        this.playerMoving = this.playerMoving.team === 0 ? this.playerW : this.playerB
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
            .filter(piece => piece.team === this.playerMoving.team)
            .map(piece => piece.getKillPossibilities(this))
            .flat()
            .filter(mv => {
                const enemyKing = this.board.piecesAtBoard
                    .find(({ id, team }) => id === 0 && team !== this.playerMoving.team)
                if (enemyKing) return mv.x === enemyKing.x && mv.y === enemyKing.y
            }).length === 2
    }

    clickOverKillCaseEvent(x, y) {
        const pieceToKill = this.board.getPieceFromCaseCordenates(x, y)
        if (pieceToKill && pieceToKill.team !== this.playerMoving.selectedPiece.team) {
            this.playerMoving.killEnemyPiece(this.board, pieceToKill)
            this.changePlayerMoving()
        }
    }

    clickOverMoveCaseEvent(x, y) {
        this.playerMoving.moveSelectedPieceTo(this.board, x, y)
        this.board.resetPossibleMoveCases()
        this.rounds++

        if (this.occuredCheckMatch()) {
            this.endGame()
            return
        }

        this.changePlayerMoving()
    }
}