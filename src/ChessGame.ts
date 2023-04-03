import Board from "./Board.js"
import Death from "./chess_pieces/Death.js"
import Player from "./models/Player.js"

import ChessPiece from "./models/ChessPiece.js"
import Movement from "./models/Position.js"
import Pawn from "./chess_pieces/Pawn.js"
import BoardEventController from "./models/BoardEventController.js"
import GamePanel from "./models/GamePanel.js"
import { clickOverChessCase } from "./index.js"
import Queen from "./chess_pieces/Queen.js"


// 0 -> Black
// 1 -> White

export default class ChessGame {
    rounds: number
    board: Board
    playerB: Player
    playerW: Player
    playerMoving: Player
    playerWaiting: Player
    boardEvent: BoardEventController
    panel: GamePanel

    constructor() {
        this.rounds = 0
        this.board = new Board(600)
        this.playerB = new Player('black')
        this.playerW = new Player('white')
        this.playerMoving = this.playerW
        this.playerWaiting = this.playerB
        this.boardEvent = new BoardEventController(this)
        this.panel = new GamePanel(this)
    }

    private addEvents() {
        this.boardEvent.addClickEventToCases('new', clickOverChessCase)
    }

    startGame() {
        this.board.render()
        this.addEvents()
        this.playerMoving = this.playerW
        this.panel.update()
        // this.board.placePiecesAtInitialPosition()
        this.board.appendPiece(new Pawn(4, 1, 'white'))
        this.board.appendPiece(new Pawn(5, 1, 'white'))
        this.board.appendPiece(new Death(3, 2, 'white'))
        this.board.appendPiece(new Pawn(1, 1, 'black'))
        this.board.appendPiece(new Pawn(6, 6, 'black'))

        this.playerB.graveyard.appendPiece(new Queen(1, 1, 'white'))
        this.playerB.graveyard.appendPiece(new Pawn(1, 1, 'white'))
        this.playerW.graveyard.appendPiece(new Pawn(1, 1, 'black'))
        this.playerW.graveyard.appendPiece(new Queen(1, 1, 'black'))
    }

    changePlayerMoving() {
        if (this.playerMoving.team === 'black') {
            this.playerMoving = this.playerW
            this.playerWaiting = this.playerB
        }
        
        else if (this.playerMoving.team === 'white') {
            this.playerMoving = this.playerB
            this.playerWaiting = this.playerW
        }

        this.panel.update()
    }

    endGame() {
        this.board.blockCases();

        (document.querySelector('.check-match-message') as Element).classList.remove('hidden');
        (document.querySelector('.background-shadow') as Element).classList.remove('hidden')
        if (this.playerMoving)
            (document.querySelector('.player-winner') as Element).textContent = this.playerMoving.getName()
    }

    occuredCheckMatch() {

        return this.board.piecesAtBoard
            .filter((piece: ChessPiece) => piece.team === this.playerMoving.team)
            .map((piece: ChessPiece) => piece.getKillPossibilities(this))
            .flat()
            .filter((mv: Movement) => {
                const enemyKing = this.board.piecesAtBoard.find(({ id, team }: ChessPiece) => id === 0 && team !== this.playerMoving.team)
                if (enemyKing) return mv.x === enemyKing.x && mv.y === enemyKing.y
            }).length === 2
    }
}