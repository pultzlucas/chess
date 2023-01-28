import PieceCase from "./PieceCase.js"

export default class Board {
    constructor() {
        this.piecesAtBoard = []
        this.selectedPiece = null
        this.pieceCases = new Array(8).fill(null)
            .map((_, y) => {
                return new Array(8).fill(null).map((_, x) => {
                    let pieceCaseType = 0

                    // x and y is even
                    if (x % 2 === 0 && y % 2 == 0) pieceCaseType = 1

                    // x and y is odd
                    if (x % 2 !== 0 && y % 2 !== 0) pieceCaseType = 1

                    return new PieceCase(x, y, pieceCaseType)
                })
            })
    }

    selectPiece(piece) {
        this.selectedPiece = piece
    }

    moveSelectedPieceTo(x, y) {
        this.removePiece(this.selectedPiece)
        
        // If has enemy piece on case, removes it
        if(this.getPieceFromCaseCordenates(x, y)) {
            this.removePiece(this.getPieceFromCaseCordenates(x, y))
        }

        this.selectedPiece.x = x
        this.selectedPiece.y = y
        this.selectedPiece.moves++

        this.appendPiece(this.selectedPiece)
    }

    removePiece({ x, y }) {
        this.pieceCases[y][x].piece = null
        this.getPieceCaseElement(x, y).firstChild.remove()
    }

    getPieceCaseElement(x, y) {
        return document.querySelector(`[x="${x}"][y="${y}"]`)
    }

    getPieceFromCaseCordenates(x, y) {
        try {
            return this.pieceCases[y][x].piece
        } catch (error) {
            return undefined
        }
    }

    appendPiece(piece) {
        this.piecesAtBoard.push(piece)

        if (this.pieceCases.length > 0) {
            this.pieceCases[piece.y][piece.x].piece = piece
        }

        const pieceCaseEl = this.getPieceCaseElement(piece.x, piece.y)
        const img = document.createElement('img')
        img.classList.add('piece-img')
        img.src = `./src/assets/${piece.id}-${piece.color}.png`
        pieceCaseEl.appendChild(img)
    }
}