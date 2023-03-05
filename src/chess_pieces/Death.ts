import ChessPiece from "../models/ChessPiece.js";
import ChessGame from "../ChessGame.js";
import { clickOverChessCase } from "../index.js";
import PieceCase from "../models/PieceCase.js";
import { CaseMark } from "../models/CaseMark.js";
import Position from "../models/Position.js";

export default class Death extends ChessPiece {
    constructor(x: number, y: number, team: number) {
        super(8, x, y, team)
        this.setTimesPermitedToActiveSpecial(1)
    }

    executeSpecialMode({ board, playerMoving }: ChessGame) {
        alert('Escolha uma peça para a morte levar')

        board.piecesAtBoard
            .filter(({ team }) => team !== playerMoving?.team)
            .map(({ x, y }) => board.getPieceCaseElement(x, y))
            .filter(caseElement => this.x !== Number(caseElement.getAttribute('x')) && this.y !== Number(caseElement.getAttribute('y')))
            .forEach(caseElement => {
                board.addMarkToPositionCase({
                    x: Number(caseElement.getAttribute('x')),
                    y: Number(caseElement.getAttribute('y'))
                } as PieceCase, CaseMark.Kill)
            })
            
        board.addClickEventToCases(killEnemyPiece)

        function killEnemyPiece(e: Event) {
            const target = e.target as Element
            let caseElement = target.classList.contains('piece-case') ? target : target.parentNode as Element

            playerMoving?.killEnemyPiece(board, {
                x: Number(caseElement.getAttribute('x')),
                y: Number(caseElement.getAttribute('y')),
            } as ChessPiece)

            board.resetPossibleMoveCases()
            board.addClickEventToCases(clickOverChessCase)
        }
    }

    getPositionAfterKill(piece: ChessPiece, killX: number, killY: number): Position {
        if(this.specialModeIsActived) return {x: this.x, y: this.y}
        return { x: killX, y: killY }    
    }

    getKillPossibilities({ board }: ChessGame) {
        return [
            { x: this.x - 1, y: this.y }, // left
            { x: this.x + 1, y: this.y }, // right
            { x: this.x, y: this.y - 1 }, // top
            { x: this.x, y: this.y + 1 }, // bottom
            { x: this.x - 1, y: this.y + 1 }, // top left
            { x: this.x + 1, y: this.y - 1 }, // top right
            { x: this.x - 1, y: this.y - 1 }, // bottom left
            { x: this.x + 1, y: this.y + 1 }, // bottom right
        ]
            .filter(({ x, y }) => {
                const otherPiece = board.getPieceFromCaseCordenates(x, y)
                if (otherPiece) return board.getPieceFromCaseCordenates(x, y) && this.team !== otherPiece.team
            })
    }

    getMovementPossibilities({ board }: ChessGame) {
        const moves = [
            { x: this.x - 2, y: this.y - 1 },
            { x: this.x - 2, y: this.y + 1 },

            { x: this.x + 2, y: this.y - 1 },
            { x: this.x + 2, y: this.y + 1 },

            { x: this.x + 1, y: this.y - 2 },
            { x: this.x - 1, y: this.y - 2 },

            { x: this.x + 1, y: this.y + 2 },
            { x: this.x - 1, y: this.y + 2 },
        ]

        if (this.getKillPossibilities({ board } as ChessGame).length > 0) return []

        return moves.filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y))
    }
}
