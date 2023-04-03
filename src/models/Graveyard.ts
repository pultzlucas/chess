import { clickOverChessCase } from "../index.js"
import ChessPiece from "./ChessPiece.js"

export default class Graveyard {
    team: string
    pieces: ChessPiece[]
    graveyardElement: HTMLDivElement
    piecesEvent: ((this: HTMLDivElement, ev: MouseEvent) => any) | null

    constructor(team: string) {
        this.team = team
        this.pieces = []
        this.piecesEvent = null
        const chessBoard = document.querySelector('.chess-board') as HTMLDivElement
        const graveyard = document.createElement('div')
        graveyard.classList.add('graveyard', `graveyard-${this.team}`)

        const gameArea = document.querySelector('.game-area') as HTMLDivElement

        if (this.team === 'black') {
            gameArea.insertBefore(graveyard, chessBoard)
            graveyard.setAttribute('team', '0')
        }
        if (this.team === 'white') {
            gameArea.insertBefore(graveyard, chessBoard.nextSibling)
            graveyard.setAttribute('team', '1')
        }

        this.graveyardElement = document.querySelector(`.graveyard-${this.team}`) as HTMLDivElement
    }

    getPieceById(id: number) {
        return this.pieces.find(({ graveyardId }) => graveyardId === id)
    }

    appendPiece(piece: ChessPiece) {
        this.pieces.push(piece)
        piece.graveyardId = this.pieces.length - 1

        // Create dead piece
        const deadPiece = document.createElement('div')
        deadPiece.classList.add('dead-piece')
        deadPiece.setAttribute('graveyard_id', String(this.pieces.length - 1))
        const pieceImg = document.createElement('img')
        pieceImg.src = `${location.href}/assets/${piece.id}-${piece.team === 'black' ? 0 : 1}.png`
        deadPiece.appendChild(pieceImg)
        this.graveyardElement.appendChild(deadPiece)
    }

    deletePiece(id: number) {
        document.querySelector(`.dead-piece[graveyard_id="${id}"]`)?.remove()
        return !!this.pieces.splice(id, 1)
    }

    addClickEventToPieces(mode: 'reset' | 'new' | 'remove', team: string, cb?: ((this: HTMLDivElement, ev: MouseEvent) => any) | null) {
        const graveyard = document.querySelector(`.graveyard-${team}`)
        if(graveyard)
            (graveyard.querySelectorAll('.dead-piece') as NodeListOf<HTMLDivElement>).forEach((piece) => {
                if (mode === 'reset' && this.piecesEvent) {
                    piece.addEventListener('click', clickOverChessCase)
                    piece.removeEventListener('click', this.piecesEvent)
                }
                
                if (mode === 'new' && cb) {
                    piece.removeEventListener('click', clickOverChessCase)
                    piece.addEventListener('click', cb)
                    this.piecesEvent = cb
                }
                
                if(mode === 'remove' && this.piecesEvent) {
                    piece.removeEventListener('click', clickOverChessCase)
                    piece.removeEventListener('click', this.piecesEvent)
                }
            })
    }
}