import ChessGame from "./ChessGame.js"

const game = new ChessGame()
game.startGame()

export function clickOverChessCase(e: Event) {
    const target = e.target as Element
    let caseElement = target.classList.contains('piece-case') ? target : target.parentNode as Element

    const caseMark = caseElement.lastChild as Element
    const x = Number(caseElement.getAttribute('x'))
    const y = Number(caseElement.getAttribute('y'))
    
    game.board.resetMarks()
    
    if (caseMark) {
        if (caseMark.classList.contains('blocked')) return
        if (caseMark.classList.contains('kill')) {
            game.boardEvent.clickOverKillCaseEvent(x, y)
            return
        }
        if (caseMark.classList.contains('move')) {
            game.boardEvent.clickOverMoveCaseEvent(x, y)
            return
        }
    }

    const piece = game.board.getPieceFromCaseCordenates(x, y)
    if (piece) {
        if (game.playerMoving.team !== piece.team) return
        game.playerMoving.selectPiece(piece)
        game.board.showPossiblePlays(game, piece)
    }
}