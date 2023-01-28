import ChessGame from "./ChessGame.js"

document.addEventListener('DOMContentLoaded', () => {
    const chessGame = new ChessGame()
    chessGame.board.render()
    chessGame.startGame()

    document.querySelectorAll('.piece-case').forEach(pieceCase => {
        pieceCase.addEventListener('click', e => chessGame.clickOverCaseEvent(e))
    })
})