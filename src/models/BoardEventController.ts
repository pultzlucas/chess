import ChessGame from "../ChessGame.js"
import { clickOverChessCase } from "../index.js"
import ChessPiece from "./ChessPiece.js"

export default class BoardEventController {
    private game: ChessGame
    private casesClickEvent: ((this: HTMLDivElement, ev: Event) => any) | null

    constructor(game: ChessGame) {
        this.game = game
        this.casesClickEvent = null
    }

    addClickEventToCases(mode: 'reset' | 'new' | 'remove', cb?: ((this: HTMLDivElement, ev: Event) => any) | null) {
        (document.querySelectorAll('.piece-case') as NodeListOf<HTMLDivElement>).forEach((piece) => {
            if (mode === 'reset' && this.casesClickEvent) {
                piece.addEventListener('click', clickOverChessCase)
                piece.removeEventListener('click', this.casesClickEvent)
            }

            if (mode === 'new' && cb) {
                piece.removeEventListener('click', clickOverChessCase)
                piece.addEventListener('click', cb)
                this.casesClickEvent = cb
            }

            if(mode === 'remove' && this.casesClickEvent) {
                piece.removeEventListener('click', clickOverChessCase)
                piece.removeEventListener('click', this.casesClickEvent)
            }
        })
    }

    clickOverKillCaseEvent(x: number, y: number) {
        const pieceToKill = this.game.board.getPieceFromCaseCordenates(x, y)
        const player = this.game.playerMoving
        if (pieceToKill && pieceToKill.team !== player.selectedPiece?.team) {
            player.killEnemyPiece(this.game.board, pieceToKill)
            player.selectedPiece?.executeAfterKill(this.game)
            this.game.changePlayerMoving()
        }
    }

    clickOverMoveCaseEvent(x: number, y: number) {
        const pieceMoving = this.game.playerMoving.selectedPiece as ChessPiece

        this.game.playerMoving.moveSelectedPieceTo(this.game.board, x, y)
        this.game.rounds++

        if (this.game.occuredCheckMatch()) {
            this.game.endGame()
            return
        }

        if (pieceMoving.checkIfSpecialModeCanBeActived()) {
            pieceMoving.specialModeIsActived = true
            pieceMoving.timesActivedSpecial++
            pieceMoving.executeSpecialMode(this.game)
        } else {
            this.game.changePlayerMoving()
        }
    }
}