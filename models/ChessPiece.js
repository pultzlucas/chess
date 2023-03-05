// 0 = king
// 1 = queen
// 2 = bishop
// 3 = horse
// 4 = rook
// 5 = pawn
// 6 = lady
// 7 = archer
// 8 = death
export default class ChessPiece {
    team;
    id;
    x;
    y;
    alive;
    moves;
    specialModeIsActived;
    timesActivedSpecial;
    timesPermitedToActiveSpecial;
    graveyardId;
    constructor(id, x, y, team) {
        this.id = id;
        this.team = team;
        this.x = x;
        this.y = y;
        this.alive = true;
        this.moves = 0;
        this.timesActivedSpecial = 0;
        this.timesPermitedToActiveSpecial = 0;
        this.specialModeIsActived = false;
        this.graveyardId = null;
    }
    setTimesPermitedToActiveSpecial(times) {
        this.timesPermitedToActiveSpecial = times;
    }
    checkIfSpecialModeCanBeActived() {
        return (this.team === 0 && this.y === 8 || this.team === 1 && this.y === 0)
            && (this.timesPermitedToActiveSpecial > this.timesActivedSpecial);
    }
    getKillPossibilitiesLoop(team, { board, cases, xFunc, yFunc }) {
        for (let i in new Array(cases).fill(null)) {
            const cord = {
                x: xFunc(Number(i)),
                y: yFunc(Number(i))
            };
            const piece = board.getPieceFromCaseCordenates(cord.x, cord.y);
            if (piece) {
                if (piece.team === team)
                    break;
                return cord;
            }
        }
    }
    getMovementPossibilitiesLoop(team, { board, cases, xFunc, yFunc }) {
        let moves = [];
        for (let i in new Array(cases).fill(null)) {
            const cord = {
                x: xFunc(Number(i)),
                y: yFunc(Number(i))
            };
            const piece = board.getPieceFromCaseCordenates(cord.x, cord.y);
            if (piece)
                break;
            moves.push(cord);
        }
        return moves;
    }
    getKillPossibilities(game) {
        return [];
    }
    getMovementPossibilities(game) {
        return [];
    }
    getPositionAfterKill(piece, killX, killY) {
        return { x: killX, y: killY };
    }
    executeSpecialMode(game) { }
    executeAfterKill(game) { }
}
