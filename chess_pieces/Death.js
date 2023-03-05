import ChessPiece from "../models/ChessPiece.js";
import { clickOverChessCase } from "../index.js";
import { CaseMark } from "../models/CaseMark.js";
export default class Death extends ChessPiece {
    constructor(x, y, team) {
        super(8, x, y, team);
        this.setTimesPermitedToActiveSpecial(1);
    }
    executeSpecialMode({ board, playerMoving }) {
        alert('Escolha uma peça para a morte levar');
        board.piecesAtBoard
            .filter(({ team }) => team !== playerMoving?.team)
            .map(({ x, y }) => board.getPieceCaseElement(x, y))
            .filter(caseElement => this.x !== Number(caseElement.getAttribute('x')) && this.y !== Number(caseElement.getAttribute('y')))
            .forEach(caseElement => {
            board.addMarkToPositionCase({
                x: Number(caseElement.getAttribute('x')),
                y: Number(caseElement.getAttribute('y'))
            }, CaseMark.Kill);
        });
        board.addClickEventToCases(killEnemyPiece);
        function killEnemyPiece(e) {
            const target = e.target;
            let caseElement = target.classList.contains('piece-case') ? target : target.parentNode;
            playerMoving?.killEnemyPiece(board, {
                x: Number(caseElement.getAttribute('x')),
                y: Number(caseElement.getAttribute('y')),
            });
            board.resetPossibleMoveCases();
            board.addClickEventToCases(clickOverChessCase);
        }
    }
    getPositionAfterKill(piece, killX, killY) {
        if (this.specialModeIsActived)
            return { x: this.x, y: this.y };
        return { x: killX, y: killY };
    }
    getKillPossibilities({ board }) {
        return [
            { x: this.x - 1, y: this.y },
            { x: this.x + 1, y: this.y },
            { x: this.x, y: this.y - 1 },
            { x: this.x, y: this.y + 1 },
            { x: this.x - 1, y: this.y + 1 },
            { x: this.x + 1, y: this.y - 1 },
            { x: this.x - 1, y: this.y - 1 },
            { x: this.x + 1, y: this.y + 1 }, // bottom right
        ]
            .filter(({ x, y }) => {
            const otherPiece = board.getPieceFromCaseCordenates(x, y);
            if (otherPiece)
                return board.getPieceFromCaseCordenates(x, y) && this.team !== otherPiece.team;
        });
    }
    getMovementPossibilities({ board }) {
        const moves = [
            { x: this.x - 2, y: this.y - 1 },
            { x: this.x - 2, y: this.y + 1 },
            { x: this.x + 2, y: this.y - 1 },
            { x: this.x + 2, y: this.y + 1 },
            { x: this.x + 1, y: this.y - 2 },
            { x: this.x - 1, y: this.y - 2 },
            { x: this.x + 1, y: this.y + 2 },
            { x: this.x - 1, y: this.y + 2 },
        ];
        if (this.getKillPossibilities({ board }).length > 0)
            return [];
        return moves.filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y));
    }
}
