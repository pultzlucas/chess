import Pawn from "../chess_pieces/Pawn.js"
import Lady from "../chess_pieces/Lady.js"

export default class Graveyard {
    constructor(team) {
        this.team = team
        this.pieces = []

        const chessBoard = document.querySelector('.chess-board')
        const graveyard = document.createElement('div')
        graveyard.classList.add('graveyard', `graveyard-${this.team === 0 ? 'black' : 'white'}`)

        if (this.team === 0) document.querySelector('.game-area').insertBefore(graveyard, chessBoard)
        if (this.team === 1) document.querySelector('.game-area').insertBefore(graveyard, chessBoard.nextSibling)

        this.graveyardElement = document.querySelector(`.graveyard-${this.team === 0 ? 'black' : 'white'}`)
    }

    appendPiece(piece) {
        this.pieces.push(piece)

        // Create dead piece
        const deadPiece = document.createElement('div')
        deadPiece.classList.add('dead-piece')
        const pieceImg = document.createElement('img')
        pieceImg.src = `./src/assets/${piece.id}-${piece.team}.png`
        deadPiece.appendChild(pieceImg)
        this.graveyardElement.appendChild(deadPiece)
    }
}