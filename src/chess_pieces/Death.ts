import ChessPiece from "../models/ChessPiece.js";
import ChessGame from "../ChessGame.js";

export default class Death extends ChessPiece {
    constructor(x: number, y: number, team: number) {
        super(8, x, y, team)
    }

    activeSpecialMode({ board, playerMoving }: ChessGame) {
        // console.log('Escolha uma peça para a morte levar')

        // document.querySelectorAll('.piece-case').forEach(pieceCase => {
        //     pieceCase.removeEventListener('click', clickOverChessCase)
        // })

        // board.piecesAtBoard
        //     .filter(({ team }) => team !== playerMoving.team)
        //     .map(({ x, y }) => board.getPieceCaseElement(x, y))
        //     .forEach(console.log)
        //     .forEach(caseElement => board.addMarkToPositionCase(caseElement, 'kill'))


        // document.querySelectorAll('.piece-case').forEach(pieceCase => {
        //     pieceCase.removeEventListener('click', e => {

        //     })
        // })

        // playerMoving.killEnemyPiece(board, )
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
                if(otherPiece) return board.getPieceFromCaseCordenates(x, y) && this.team !== otherPiece.team                   
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
