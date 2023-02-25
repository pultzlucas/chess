import Board from "../Board.js"
import ChessPiece from "./ChessPiece.js"
import Graveyard from "./Graveyard.js"

export default class Player {
    team: number
    moves: number
    selectedPiece: ChessPiece | null
    graveyard: Graveyard

    constructor(team: number) {
        this.team = team
        this.moves = 0
        this.selectedPiece = null
        this.graveyard = new Graveyard(team)
    }

    getName(): string {
        return this.team === 0 ? 'black' : 'white'
    }

    selectPiece(piece: ChessPiece) {
        this.selectedPiece = piece
    }

    killEnemyPiece(board: Board, { x, y }: ChessPiece) {
        const pieceToKill = board.getPieceFromCaseCordenates(x, y) as ChessPiece
        this.graveyard.appendPiece(pieceToKill)
        if(this.selectedPiece) {
            const positionAfterKill = this.selectedPiece.getPositionAfterKill(this.selectedPiece, x, y)
            board.removePiece(pieceToKill)
            this.moveSelectedPieceTo(board, positionAfterKill.x, positionAfterKill.y)
        }
    }

    moveSelectedPieceTo(board: Board, x: number, y: number) {
        if(this.selectedPiece) {
            board.removePiece(this.selectedPiece)
            this.selectedPiece.x = x
            this.selectedPiece.y = y
            this.selectedPiece.moves++
            board.appendPiece(this.selectedPiece)
            this.moves++
        }
    }
}