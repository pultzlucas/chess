import Board from "./Board.js";
import Player from "./models/Player.js";
import Pawn from "./chess_pieces/Pawn.js";
import Archer from "./chess_pieces/Archer.js";
export default class ChessGame {
    rounds;
    board;
    playerB;
    playerW;
    playerMoving;
    constructor() {
        this.rounds = 0;
        this.board = new Board(700);
        this.playerB = new Player(0);
        this.playerW = new Player(1);
        this.playerMoving = this.playerW;
    }
    startGame() {
        this.playerMoving = this.playerW;
        this.updatePlayerMovingPanel();
        // this.board.placePiecesAtInitialPosition()
        this.board.appendPiece(new Archer(4, 4, 1));
        this.board.appendPiece(new Pawn(6, 6, 1));
        this.board.appendPiece(new Pawn(2, 0, 0));
        this.board.appendPiece(new Pawn(6, 1, 0));
    }
    updatePlayerMovingPanel() {
        if (this.playerMoving)
            document.querySelector('.player-moving').textContent = this.playerMoving.getName();
    }
    changePlayerMoving() {
        if (this.playerMoving)
            this.playerMoving = this.playerMoving.team === 0 ? this.playerW : this.playerB;
        this.updatePlayerMovingPanel();
    }
    endGame() {
        this.board.blockCases();
        document.querySelector('.check-match-message').classList.remove('hidden');
        document.querySelector('.background-shadow').classList.remove('hidden');
        if (this.playerMoving)
            document.querySelector('.player-winner').textContent = this.playerMoving.getName();
    }
    occuredCheckMatch() {
        return this.board.piecesAtBoard
            .filter((piece) => {
            if (this.playerMoving)
                return piece.team === this.playerMoving.team;
        })
            .map((piece) => piece.getKillPossibilities(this))
            .flat()
            .filter((mv) => {
            const enemyKing = this.board.piecesAtBoard.find(({ id, team }) => {
                if (this.playerMoving)
                    return id === 0 && team !== this.playerMoving.team;
            });
            if (enemyKing)
                return mv.x === enemyKing.x && mv.y === enemyKing.y;
        }).length === 2;
    }
    clickOverKillCaseEvent(x, y) {
        this.board.resetPossibleMoveCases();
        const pieceToKill = this.board.getPieceFromCaseCordenates(x, y);
        if (this.playerMoving)
            if (pieceToKill && pieceToKill.team !== this.playerMoving.selectedPiece?.team) {
                this.playerMoving.killEnemyPiece(this.board, pieceToKill);
                this.playerMoving.selectedPiece?.executeAfterKill(this);
                this.changePlayerMoving();
            }
    }
    clickOverMoveCaseEvent(x, y) {
        this.board.resetPossibleMoveCases();
        if (this.playerMoving) {
            const pieceMoving = this.playerMoving.selectedPiece;
            this.playerMoving.moveSelectedPieceTo(this.board, x, y);
            this.board.resetPossibleMoveCases();
            this.rounds++;
            if (this.occuredCheckMatch()) {
                this.endGame();
                return;
            }
            if (pieceMoving.checkIfSpecialModeCanBeActived()) {
                pieceMoving.specialModeIsActived = true;
                pieceMoving.executeSpecialMode(this);
                pieceMoving.timesActivedSpecial++;
            }
        }
        this.changePlayerMoving();
    }
}
