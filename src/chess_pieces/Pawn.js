import ChessPiece from "../models/ChessPiece.js";

export default class Pawn extends ChessPiece {
    constructor(x, y, color) {
        super(5, x, y, color)
    }

    getMovementPossibilities(piece, { board }) {
        const movements = () => {
            if(piece.color === 0) {
                if (piece.moves === 0) {
                    return [{ x: this.x, y: this.y + 1 }, { x: this.x, y: this.y + 2 }]
                }
    
                return [{ x: this.x, y: this.y + 1 }]
            }

            if(piece.color === 1) {
                if (piece.moves === 0) {
                    return [{ x: this.x, y: this.y - 1 }, { x: this.x, y: this.y - 2 }]
                }
    
                return [{ x: this.x, y: this.y - 1 }]
            }
        }

        const moves = movements().filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y))

        if(piece.color === 0) {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y + 1)
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y + 1)
    
            if (rightEnemyPiece && piece.color !== rightEnemyPiece.color) {
                moves.push({ x: this.x + 1, y: this.y + 1 })
            }
    
            if (leftEnemyPiece && piece.color !== leftEnemyPiece.color) {
                moves.push({ x: this.x - 1, y: this.y + 1 })
            }
        }

        if(piece.color === 1) {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y - 1)
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y - 1)
    
            if (rightEnemyPiece && piece.color !== rightEnemyPiece.color) {
                moves.push({ x: this.x + 1, y: this.y - 1 })
            }
    
            if (leftEnemyPiece && piece.color !== leftEnemyPiece.color) {
                moves.push({ x: this.x - 1, y: this.y - 1 })
            }
        }

        return moves
    }
}