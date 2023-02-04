import ChessGame from "./ChessGame.js"

document.addEventListener('DOMContentLoaded', () => {
    const chessGame = new ChessGame()
    chessGame.board.render()
    chessGame.startGame()

    document.querySelectorAll('.piece-case').forEach(pieceCase => {
        pieceCase.addEventListener('click', e => {
            const caseElement = e.target.classList.contains('piece-case') ? e.target : e.target.parentNode
            const caseMark = caseElement.lastChild
            const x = Number(caseElement.getAttribute('x'))
            const y = Number(caseElement.getAttribute('y'))

            if(caseMark) {
                if (caseMark.classList.contains('blocked')) return
                if (caseMark.classList.contains('kill')) chessGame.clickOverKillCaseEvent(x, y)
                if (caseMark.classList.contains('move')) chessGame.clickOverMoveCaseEvent(x, y)
            }

            chessGame.board.resetPossibleMoveCases()

            const piece = chessGame.board.getPieceFromCaseCordenates(x, y)
            // console.log(x, y, chessGame.board.pieceCases)
            if (piece) {
                if (chessGame.playerMoving.team !== piece.team) return
                chessGame.playerMoving.selectPiece(piece)
                chessGame.board.showPossibleMoveCases(chessGame, piece)
            }
        })
    })
})