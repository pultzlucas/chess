import ChessPiece from "./ChessPiece.js"

export default class Graveyard {
    team: number
    pieces: ChessPiece[]
    graveyardElement: HTMLDivElement

    constructor(team: number) {
        this.team = team
        this.pieces = []

        const chessBoard = document.querySelector('.chess-board') as HTMLDivElement
        const graveyard = document.createElement('div')
        graveyard.classList.add('graveyard', `graveyard-${this.team === 0 ? 'black' : 'white'}`)

        const gameArea = document.querySelector('.game-area') as HTMLDivElement

        if (this.team === 0) gameArea.insertBefore(graveyard, chessBoard)
        if (this.team === 1) gameArea.insertBefore(graveyard, chessBoard.nextSibling)

        this.graveyardElement = document.querySelector(`.graveyard-${this.team === 0 ? 'black' : 'white'}`) as HTMLDivElement
    }

    appendPiece(piece: ChessPiece) {
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