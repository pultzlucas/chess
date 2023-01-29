import Bishop from "./chess_pieces/Bishop.js"
import Horse from "./chess_pieces/Horse.js"
import King from "./chess_pieces/King.js"
import Pawn from "./chess_pieces/Pawn.js"
import Queen from "./chess_pieces/Queen.js"
import Rook from "./chess_pieces/Rook.js"
import PieceCase from "./models/PieceCase.js"

export default class Board {
    constructor(size) {
        this.piecesAtBoard = []
        this.selectedPiece = null
        this.size = size

        this.boardElement = document.querySelector('.chess-board')
        this.boardElement.style.width = `${this.size}px`
        this.boardElement.style.height = `${this.size}px`
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

    render() {
        this.pieceCases.forEach(row => {
            const rowEl = document.createElement('div')
            row.forEach(({ color, x, y }) => {
                const caseColor = color === 0 ? '#999' : '#fff'
                const caseSize = this.size / 8

                const pieceCaseEl = document.createElement('div')
                pieceCaseEl.classList.add('piece-case')
                pieceCaseEl.setAttribute('x', x)
                pieceCaseEl.setAttribute('y', y)
                pieceCaseEl.style.setProperty('--case-bg-color', caseColor)
                pieceCaseEl.style.setProperty('--case-size', `${caseSize}px`)
                pieceCaseEl.style.left = `${x * caseSize}px`
                pieceCaseEl.style.top = `${y * caseSize}px`

                rowEl.appendChild(pieceCaseEl)
            })
            this.boardElement.appendChild(rowEl)
        })
    }

    resetPossibleMoveCases() {
        this.boardElement.querySelectorAll('.piece-case-mark').forEach(mark => mark.remove())
    }

    showPossibleMoveCases(gameState, piece) {
        const movements = piece.getMovementPossibilities(gameState)
        movements.forEach(({ x, y }) => {
            const mvCase = this.getPieceCaseElement(x, y)
            const piece = this.getPieceFromCaseCordenates(x, y)
            if (mvCase) {
                const bgColor = document.createElement('div')              
                bgColor.classList.add('piece-case-mark')
                
                if(piece) {
                    const pieceIsKing = piece.id === 0
                    if(pieceIsKing) {
                        bgColor.classList.add('check')
                    } else {
                        bgColor.classList.add('kill')
                    }
                } else {
                    bgColor.classList.add('move')
                }

                mvCase.appendChild(bgColor)
            }
        })
    }

    blockCases() {
        this.boardElement.querySelectorAll('.piece-case').forEach(pieceCase => {
            pieceCase.classList.add('blocked')
        })
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

    placePiecesAtInitialPosition() {
        // Black team
        this.appendPiece(new Pawn(0, 1, 0))
        this.appendPiece(new Pawn(1, 1, 0))
        this.appendPiece(new Pawn(2, 1, 0))
        this.appendPiece(new Pawn(3, 1, 0))
        this.appendPiece(new Pawn(4, 1, 0))
        this.appendPiece(new Pawn(5, 1, 0))
        this.appendPiece(new Pawn(6, 1, 0))
        this.appendPiece(new Pawn(7, 1, 0))
        this.appendPiece(new Rook(0, 0, 0))
        this.appendPiece(new Rook(7, 0, 0))
        this.appendPiece(new Bishop(2, 0, 0))
        this.appendPiece(new Bishop(5, 0, 0))
        this.appendPiece(new Horse(1, 0, 0))
        this.appendPiece(new Horse(6, 0, 0))
        this.appendPiece(new King(3, 0, 0))
        this.appendPiece(new Queen(4, 0, 0))
        
        // White team
        this.appendPiece(new Pawn(0, 6, 1))
        this.appendPiece(new Pawn(1, 6, 1))
        this.appendPiece(new Pawn(2, 6, 1))
        this.appendPiece(new Pawn(3, 6, 1))
        this.appendPiece(new Pawn(4, 6, 1))
        this.appendPiece(new Pawn(5, 6, 1))
        this.appendPiece(new Pawn(6, 6, 1))
        this.appendPiece(new Pawn(7, 6, 1))
        this.appendPiece(new Rook(0, 7, 1))
        this.appendPiece(new Rook(7, 7, 1))
        this.appendPiece(new Bishop(2, 7, 1))
        this.appendPiece(new Bishop(5, 7, 1))
        this.appendPiece(new Horse(1, 7, 1))
        this.appendPiece(new Horse(6, 7, 1))
        this.appendPiece(new King(4, 7, 1))
        this.appendPiece(new Queen(3, 7, 1))
    }
}