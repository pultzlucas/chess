import ChessPiece from "./ChessPiece.js"

export default class PieceCase {
    x: number
    y: number
    color: number
    piece: ChessPiece | null

    constructor(x: number, y: number, color: number) {
        this.x = x
        this.y = y
        this.color = color
        this.piece = null
    }
}