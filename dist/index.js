import ChessGame from "./ChessGame.js";
const chessGame = new ChessGame();
chessGame.board.render();
chessGame.startGame();
document.querySelectorAll('.piece-case').forEach(pieceCase => {
    pieceCase.addEventListener('click', clickOverChessCase);
});
export function clickOverChessCase(e) {
    const target = e.target;
    let caseElement = target.classList.contains('piece-case') ? target : target.parentNode;
    const caseMark = caseElement.lastChild;
    const x = Number(caseElement.getAttribute('x'));
    const y = Number(caseElement.getAttribute('y'));
    if (caseMark) {
        if (caseMark.classList.contains('blocked'))
            return;
        if (caseMark.classList.contains('kill'))
            chessGame.clickOverKillCaseEvent(x, y);
        if (caseMark.classList.contains('move'))
            chessGame.clickOverMoveCaseEvent(x, y);
    }
    const piece = chessGame.board.getPieceFromCaseCordenates(x, y);
    if (piece && chessGame.playerMoving) {
        if (chessGame.playerMoving.team !== piece.team)
            return;
        chessGame.playerMoving.selectPiece(piece);
        chessGame.board.showPossibleMoveCases(chessGame, piece);
    }
}
