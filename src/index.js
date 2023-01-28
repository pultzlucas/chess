import ChessGame from "./ChessGame.js"

document.addEventListener('DOMContentLoaded', () => {
    const chessGame = new ChessGame()
    chessGame.renderChessBoard()
    chessGame.startGame()

    document.querySelectorAll('.piece-case').forEach(pieceCase => {
        pieceCase.addEventListener('click', e => chessGame.clickOverCaseEvent(e))
    })
})