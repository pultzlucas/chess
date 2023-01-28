import Board from "./models/Board.js"
import Bishop from "./chess_pieces/Bishop.js"
import Pawn from "./chess_pieces/Pawn.js"
import Rook from "./chess_pieces/Rook.js"
import Queen from "./chess_pieces/Queen.js"
import King from "./chess_pieces/King.js"
import Horse from "./chess_pieces/Horse.js"

export default class ChessGame {
    constructor() {
        this.rounds = 0
        this.boardSize = 600
        this.board = new Board()
        this.boardElement = document.querySelector('.chess-board')
        this.boardElement.style.width = `${this.boardSize}px`
        this.boardElement.style.height = `${this.boardSize}px`
    }

    renderChessBoard() {
        this.board.pieceCases.forEach(row => {
            const rowEl = document.createElement('div')
            row.forEach(({ color, x, y }) => {
                const caseColor = color === 0 ? '#666' : '#fff'
                const caseSize = this.boardSize / 8

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

    startGame() {
        // Black team
        this.board.appendPiece(new Pawn(0, 1, 0))
        this.board.appendPiece(new Pawn(1, 1, 0))
        this.board.appendPiece(new Pawn(2, 1, 0))
        this.board.appendPiece(new Pawn(3, 1, 0))
        this.board.appendPiece(new Pawn(4, 1, 0))
        this.board.appendPiece(new Pawn(5, 1, 0))
        this.board.appendPiece(new Pawn(6, 1, 0))
        this.board.appendPiece(new Pawn(7, 1, 0))
        this.board.appendPiece(new Rook(0, 0, 0))
        this.board.appendPiece(new Rook(7, 0, 0))
        this.board.appendPiece(new Bishop(2, 0, 0))
        this.board.appendPiece(new Bishop(5, 0, 0))
        this.board.appendPiece(new Horse(1, 0, 0))
        this.board.appendPiece(new Horse(6, 0, 0))
        this.board.appendPiece(new King(3, 0, 0))
        this.board.appendPiece(new Queen(4, 0, 0))
        
        // White team
        this.board.appendPiece(new Pawn(0, 6, 1))
        this.board.appendPiece(new Pawn(1, 6, 1))
        this.board.appendPiece(new Pawn(2, 6, 1))
        this.board.appendPiece(new Pawn(3, 6, 1))
        this.board.appendPiece(new Pawn(4, 6, 1))
        this.board.appendPiece(new Pawn(5, 6, 1))
        this.board.appendPiece(new Pawn(6, 6, 1))
        this.board.appendPiece(new Pawn(7, 6, 1))
        this.board.appendPiece(new Rook(0, 7, 1))
        this.board.appendPiece(new Rook(7, 7, 1))
        this.board.appendPiece(new Bishop(2, 7, 1))
        this.board.appendPiece(new Bishop(5, 7, 1))
        this.board.appendPiece(new Horse(1, 7, 1))
        this.board.appendPiece(new Horse(6, 7, 1))
        this.board.appendPiece(new King(4, 7, 1))
        this.board.appendPiece(new Queen(3, 7, 1))

    }

    clickOverCaseEvent(e) {
        const pieceCaseEl = e.target.classList.contains('piece-case') ? e.target : e.target.parentNode
        const x = Number(pieceCaseEl.getAttribute('x'))
        const y = Number(pieceCaseEl.getAttribute('y'))

        console.log(pieceCaseEl)

        // If the clicked case has a mark, moves the piece selected to the case marked
        if (pieceCaseEl.querySelector('.piece-case-mark') && !pieceCaseEl.querySelector('.check')) {
            this.moveSelectedPiece(x, y)
            this.boardElement.querySelectorAll('.piece-case-mark').forEach(mark => mark.remove())
            return
        }

        this.boardElement.querySelectorAll('.piece-case-mark').forEach(mark => mark.remove())

        // If the clicked case has a piece, selects the piece
        const casePiece = this.board.getPieceFromCaseCordenates(x, y)
        if (casePiece) this.selectPiece(casePiece)
    }

    selectPiece(piece) {
        this.board.selectPiece(piece)

        const movements = piece.getMovementPossibilities(piece, this)
        movements.forEach(({ x, y }) => {
            const mvCase = this.board.getPieceCaseElement(x, y)
            const piece = this.board.getPieceFromCaseCordenates(x, y)
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

    moveSelectedPiece(x, y) {
        this.board.moveSelectedPieceTo(x, y)
        this.rounds++
    }

}