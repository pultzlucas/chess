import ChessPiece from "./ChessPiece.js"

export default class Graveyard {
    team: number
    pieces: ChessPiece[]
    graveyardElement: HTMLDivElement
    piecesEvent: ((this: HTMLDivElement, ev: MouseEvent) => any) | null

    constructor(team: number) {
        this.team = team
        this.pieces = []
        this.piecesEvent = null
        const chessBoard = document.querySelector('.chess-board') as HTMLDivElement
        const graveyard = document.createElement('div')
        graveyard.classList.add('graveyard', `graveyard-${this.team === 0 ? 'black' : 'white'}`)

        const gameArea = document.querySelector('.game-area') as HTMLDivElement

        if (this.team === 0) gameArea.insertBefore(graveyard, chessBoard)
        if (this.team === 1) gameArea.insertBefore(graveyard, chessBoard.nextSibling)

        this.graveyardElement = document.querySelector(`.graveyard-${this.team === 0 ? 'black' : 'white'}`) as HTMLDivElement
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
        pieceImg.src = `${location.href}/assets/${piece.id}-${piece.team}.png`
        deadPiece.appendChild(pieceImg)
        this.graveyardElement.appendChild(deadPiece)
    }

    deletePiece(id: number) {
        document.querySelector(`.dead-piece[graveyard_id="${id}"]`)?.remove()
        return !!this.pieces.splice(id, 1)
    }

    addClickEventToPieces(cb: ((this: HTMLDivElement, ev: MouseEvent) => any) | null) {
        (document.querySelectorAll('.dead-piece') as NodeListOf<HTMLDivElement>).forEach((piece) => {
            if (this.piecesEvent) piece.removeEventListener('click', this.piecesEvent)
            if (cb) piece.addEventListener('click', cb)
            this.piecesEvent = cb
        })
    }
}