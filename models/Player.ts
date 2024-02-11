import { Game, Status } from "./Game";
import { Snake } from "./beasts/Snake";

export class Player {
    score: number;
    highScore: number;
    games: Game[]
    id: number;

    constructor() {
        this.games = [new Game()]
        this.score = 0;
        this.highScore = 0;
        this.id = Math.random();
    }

    updateGame() {
        this.games[0] = new Game()
        
    }

    updateScore() {
        this.score = this.games.reduce((sum, game) => {
            if(game.beasts[0] instanceof Snake) {
                return sum + game.beasts[0].positions.length - 1
            } else {
                return sum
            }
        }, 0);
    }
  
    updateHighScore() {
        this.highScore = Math.max(this.score, this.highScore)
        if (typeof window !== 'undefined') {
            localStorage.setItem('bestScore', String(this.highScore))
        }
        
    }
}