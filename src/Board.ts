import Bishop from "./chess_pieces/Bishop.js"
import Horse from "./chess_pieces/Horse.js"
import King from "./chess_pieces/King.js"
import Pawn from "./chess_pieces/Pawn.js"
import Queen from "./chess_pieces/Queen.js"
import Rook from "./chess_pieces/Rook.js"
import Lady from "./chess_pieces/Lady.js"
import PieceCase from "./models/PieceCase.js"
import Archer from "./chess_pieces/Archer.js"
import Death from "./chess_pieces/Death.js"
import ChessPiece from "./models/ChessPiece.js"
import { CaseMark } from "./models/CaseMark.js"
import ChessGame from "./ChessGame.js"
import { clickOverChessCase } from "./index.js"

export default class Board {
    piecesAtBoard: ChessPiece[]
    selectedPiece: ChessPiece | null
    size: number
    boardElement: HTMLDivElement
    pieceCases: PieceCase[][]
    casesEvent: ((this: HTMLDivElement, ev: MouseEvent) => any) | null

    constructor(size: number) {
        this.piecesAtBoard = []
        this.selectedPiece = null
        this.size = size
        this.casesEvent = clickOverChessCase
        this.boardElement = document.querySelector('.chess-board') as HTMLDivElement
        this.boardElement.style.width = `${this.size}px`
        this.boardElement.style.height = `${this.size}px`
        this.pieceCases = new Array(8).fill(null)
            .map((_, y) => {
                const arr: null[] = new Array(8)
                return arr.fill(null).map((_, x) => {
                    let pieceCaseType = 0
                    if (x % 2 === 0 && y % 2 == 0) pieceCaseType = 1
                    if (x % 2 !== 0 && y % 2 !== 0) pieceCaseType = 1
                    return new PieceCase(x, y, pieceCaseType)
                })
            })

        const body = document.querySelector('body') as HTMLBodyElement
        body.style.setProperty('--board-size', `${this.size}px`)
        body.style.setProperty('--case-size', `${this.size / 8}px`)
    }

    render() {
        this.pieceCases.forEach(row => {
            const rowEl = document.createElement('div') as HTMLDivElement
            row.forEach(({ color, x, y }) => {
                const caseColor = color === 0 ? '#999' : '#fff'
                const caseSize = this.size / 8

                const pieceCaseEl = document.createElement('div')
                pieceCaseEl.classList.add('piece-case', 'actived')
                pieceCaseEl.setAttribute('x', String(x))
                pieceCaseEl.setAttribute('y', String(y))
                pieceCaseEl.style.setProperty('--case-bg-color', caseColor)
                pieceCaseEl.style.left = `${x * caseSize}px`
                pieceCaseEl.style.top = `${y as number * caseSize}px`

                rowEl.appendChild(pieceCaseEl)
            })
            this.boardElement.appendChild(rowEl)
        })
    }

    addMarkToPositionCase({ x, y }: PieceCase, mark: CaseMark) {
        const mvCase = this.getPieceCaseElement(x, y)
        if (mvCase) {
            const bgColor = document.createElement('div')
            bgColor.classList.add('piece-case-mark', mark)
            mvCase.appendChild(bgColor)
        }
    }

    resetPossibleMoveCases() {
        this.boardElement.querySelectorAll('.piece-case-mark').forEach(mark => mark.remove())
    }

    showPossibleMoveCases(gameState: ChessGame, piece: ChessPiece) {
        piece.getMovementPossibilities(gameState).forEach(pos => {
            this.addMarkToPositionCase(pos as PieceCase, CaseMark.Move)
        })

        piece.getKillPossibilities(gameState).forEach(pos => {
            this.addMarkToPositionCase(pos as PieceCase, CaseMark.Kill)
        })
    }

    blockCases() {
        this.boardElement.querySelectorAll('.piece-case').forEach(pieceCase => {
            pieceCase.classList.remove('actived')
        })
    }

    appendPiece(piece: ChessPiece) {
        this.piecesAtBoard.push(piece)
        this.pieceCases[piece.y][piece.x].piece = piece

        const pieceCaseEl = this.getPieceCaseElement(piece.x, piece.y)
        const img = document.createElement('img')
        img.classList.add('piece-img')
        img.src = `${location.hostname}/assets/${piece.id}-${piece.team}.png`
        pieceCaseEl.appendChild(img)
    }

    removePiece({ x, y }: ChessPiece) {
        this.pieceCases[y][x].piece = null
        this.getPieceCaseElement(x, y).firstChild?.remove()
        this.piecesAtBoard.splice(this.piecesAtBoard.findIndex(piece => piece.x === x && piece.y === y), 1)
    }

    getPieceCaseElement(x: number, y: number) {
        return document.querySelector(`[x="${x}"][y="${y}"]`) as HTMLDivElement
    }

    getPieceFromCaseCordenates(x: number, y: number) {
        try {
            return this.pieceCases[y][x].piece
        } catch (error) {
            return null
        }
    }

    addClickEventToCases(cb: ((this: HTMLDivElement, ev: MouseEvent) => any) | null) {
        (document.querySelectorAll('.piece-case') as NodeListOf<HTMLDivElement>).forEach((pieceCase) => {
            if(this.casesEvent) pieceCase.removeEventListener('click', this.casesEvent)
            if(cb) pieceCase.addEventListener('click', cb)
            this.casesEvent = cb
        })
    }

    placePiecesAtInitialPosition() {
        [
            // Black team
            new Pawn(0, 1, 0),
            new Pawn(1, 1, 0),
            new Lady(2, 1, 0),
            new Pawn(3, 1, 0),
            new Archer(4, 1, 0),
            new Lady(5, 1, 0),
            new Death(6, 1, 0),
            new Pawn(7, 1, 0),
            new Rook(0, 0, 0),
            new Rook(7, 0, 0),
            new Bishop(2, 0, 0),
            new Bishop(5, 0, 0),
            new Horse(1, 0, 0),
            new Horse(6, 0, 0),
            new King(3, 0, 0),
            new Queen(4, 0, 0),
            // White team
            new Pawn(0, 6, 1),
            new Pawn(1, 6, 1),
            new Lady(2, 6, 1),
            new Pawn(3, 6, 1),
            new Archer(4, 6, 1),
            new Lady(5, 6, 1),
            new Death(6, 6, 1),
            new Pawn(7, 6, 1),
            new Rook(0, 7, 1),
            new Rook(7, 7, 1),
            new Bishop(2, 7, 1),
            new Bishop(5, 7, 1),
            new Horse(1, 7, 1),
            new Horse(6, 7, 1),
            new King(4, 7, 1),
            new Queen(3, 7, 1)
        ]
            .forEach(piece => this.appendPiece(piece))
    }
}