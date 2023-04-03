import ChessGame from "../ChessGame.js";
import ChessPiece from "../models/ChessPiece.js";
import Position from '../models/Position.js'

export default class Pawn extends ChessPiece {
    constructor(x: number, y: number, team: string) {
        super(5, x, y, team)
        this.setTimesPermitedToActiveSpecial(1)
    }

    executeSpecialMode(gameState: ChessGame) {
        
        const graveyard = gameState.playerWaiting?.graveyard
        console.log(graveyard)

        if(graveyard.pieces.length == 0) {
            gameState.changePlayerMoving()
            return
        }

        console.log('Resgate uma peça do cemitério inimigo')

        gameState.boardEvent.addClickEventToCases('new', () => {})
        graveyard.addClickEventToPieces('new', this.team /* === 'white' ? 'black' : 'white' */, e => {
            const target = e.target as Element
            let gravePiece = target.classList.contains('piece-case') ? target : target.parentNode as HTMLDivElement

            const piece = graveyard.getPieceById(Number(gravePiece.getAttribute('graveyard_id'))) as ChessPiece

            piece.x = this.x
            piece.y = this.y
            
            gameState.board.removePiece(this)
            gameState.board.appendPiece(piece)
            graveyard.deletePiece(piece.graveyardId as number)
            
            gameState.boardEvent.addClickEventToCases('reset')
            graveyard.addClickEventToPieces('remove', this.team /* === 'white' ? 'black' : 'white' */)

            // Revive Animation
            const reviveCase = gameState.board.getPieceCaseElement(this.x, this.y)
            reviveCase.classList.add('revive')

            setTimeout(() => {
                reviveCase.classList.remove('revive')
                gameState.changePlayerMoving()
            }, 1000)
        })
        
    }

    getKillPossibilities({ board }: ChessGame) {
        let kills = []

        if (this.team === 'black') {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y + 1)
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y + 1)

            if (rightEnemyPiece && this.team !== rightEnemyPiece.team) {
                kills.push({ x: this.x + 1, y: this.y + 1 })
            }

            if (leftEnemyPiece && this.team !== leftEnemyPiece.team) {
                kills.push({ x: this.x - 1, y: this.y + 1 })
            }
        }

        if (this.team === 'white') {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y - 1)
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y - 1)

            if (rightEnemyPiece && this.team !== rightEnemyPiece.team) {
                kills.push({ x: this.x + 1, y: this.y - 1 })
            }

            if (leftEnemyPiece && this.team !== leftEnemyPiece.team) {
                kills.push({ x: this.x - 1, y: this.y - 1 })
            }
        }

        return kills
    }

    getMovementPossibilities({ board }: ChessGame) {
        const movements = () => {
            if (this.team === 'black') {
                if (this.moves === 0) {
                    return [{ x: this.x, y: this.y + 1 }, { x: this.x, y: this.y + 2 }]
                }

                return [{ x: this.x, y: this.y + 1 }]
            }

            if (this.team === 'white') {
                if (this.moves === 0) {
                    return [{ x: this.x, y: this.y - 1 }, { x: this.x, y: this.y - 2 }]
                }

                return [{ x: this.x, y: this.y - 1 }]
            }

            return []
        }

        return movements().filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y)) as Position[]
    }
}