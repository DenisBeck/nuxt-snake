import { Game, Status } from "./Game";
import { Hedgehog } from "./beasts/Hedgehog";
import { Mouse } from "./beasts/Mouse";
import { Snail } from "./beasts/Snail";
import { Snake } from "./beasts/Snake";

export class Player {
    score: number;
    highScore: number;
    games: Game[]
    id: number;

    constructor() {
        const level1 = new Game()
        level1.beasts = [new Snake(level1, 10, 10), new Snail(level1, 10, 10) ]
        this.games = [level1]
        this.score = 0;
        this.highScore = 0;
        this.id = Math.random();
    }

    restartGame() {
        const level1 = new Game()
        level1.beasts = [new Snake(level1, 10, 10), new Snail(level1, 10, 10) ]
        this.games[0] = level1
    }

    setNewGame() {
        const newLevel = new Game()
        const snake = new  Snake(newLevel, 10, 10);
        snake.gameSpeedDelay = 1000 - 50 * (this.games.length - 1)
        switch (this.games.length) {
            case 1: 
                newLevel.beasts = [ snake, new Snail(newLevel, 10, 10), new Hedgehog(newLevel, 10, 10) ];
                break;
            case 2: 
                newLevel.beasts = [
                    snake, 
                    new Snail(newLevel, 10, 10), 
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10)
                ];
                break;
            case 3:
                newLevel.beasts = [
                    snake, 
                    new Mouse(newLevel, 10, 10), 
                ];
                break;
            case 4:
                newLevel.beasts = [
                    snake, 
                    new Mouse(newLevel, 10, 10), 
                    new Hedgehog(newLevel, 10, 10),
                ];
                break;
            case 5:
                newLevel.beasts = [
                    snake, 
                    new Mouse(newLevel, 10, 10), 
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10),
                ];
                break;
        }
        this.games.unshift(newLevel)
        newLevel.showPopup()
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