import { clickOverChessCase } from "../index.js";
import ChessPiece from "../models/ChessPiece.js";
export default class Pawn extends ChessPiece {
    constructor(x, y, team) {
        super(5, x, y, team);
        this.setTimesPermitedToActiveSpecial(1);
    }
    executeSpecialMode({ board, playerMoving }) {
        board.addClickEventToCases(null);
        const graveyard = playerMoving?.graveyard;
        graveyard.addClickEventToPieces(e => {
            const target = e.target;
            let gravePiece = target.classList.contains('piece-case') ? target : target.parentNode;
            const piece = graveyard.getPieceById(Number(gravePiece.getAttribute('graveyard_id')));
            piece.x = this.x;
            piece.y = this.y;
            board.removePiece(this);
            board.appendPiece(piece);
            graveyard.deletePiece(piece.graveyardId);
            graveyard.addClickEventToPieces(null);
            board.addClickEventToCases(clickOverChessCase);
            // Revive Animation
            const reviveCase = board.getPieceCaseElement(this.x, this.y);
            reviveCase.classList.add('revive');
            setTimeout(() => {
                reviveCase.classList.remove('revive');
            }, 1000);
        });
    }
    getKillPossibilities({ board }) {
        let kills = [];
        if (this.team === 0) {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y + 1);
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y + 1);
            if (rightEnemyPiece && this.team !== rightEnemyPiece.team) {
                kills.push({ x: this.x + 1, y: this.y + 1 });
            }
            if (leftEnemyPiece && this.team !== leftEnemyPiece.team) {
                kills.push({ x: this.x - 1, y: this.y + 1 });
            }
        }
        if (this.team === 1) {
            const rightEnemyPiece = board.getPieceFromCaseCordenates(this.x + 1, this.y - 1);
            const leftEnemyPiece = board.getPieceFromCaseCordenates(this.x - 1, this.y - 1);
            if (rightEnemyPiece && this.team !== rightEnemyPiece.team) {
                kills.push({ x: this.x + 1, y: this.y - 1 });
            }
            if (leftEnemyPiece && this.team !== leftEnemyPiece.team) {
                kills.push({ x: this.x - 1, y: this.y - 1 });
            }
        }
        return kills;
    }
    getMovementPossibilities({ board }) {
        const movements = () => {
            if (this.team === 0) {
                if (this.moves === 0) {
                    return [{ x: this.x, y: this.y + 1 }, { x: this.x, y: this.y + 2 }];
                }
                return [{ x: this.x, y: this.y + 1 }];
            }
            if (this.team === 1) {
                if (this.moves === 0) {
                    return [{ x: this.x, y: this.y - 1 }, { x: this.x, y: this.y - 2 }];
                }
                return [{ x: this.x, y: this.y - 1 }];
            }
            return [];
        };
        return movements().filter(({ x, y }) => !board.getPieceFromCaseCordenates(x, y));
    }
}
