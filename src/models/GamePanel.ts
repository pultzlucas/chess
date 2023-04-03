import ChessGame from "../ChessGame"

export default class GamePanel {
    private game: ChessGame

    constructor(game: ChessGame) {
        this.game = game
    }

    update() {
        if (this.game.playerMoving)
            (document.querySelector('.player-moving') as Element).textContent = this.game.playerMoving.getName()
    }
}