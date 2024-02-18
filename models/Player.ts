import { Game, Status } from "./Game";
import { Fox } from "./beasts/Fox";
import { Hedgehog } from "./beasts/Hedgehog";
import { Mouse } from "./beasts/Mouse";
import { Snail } from "./beasts/Snail";
import { Snake } from "./beasts/Snake";

export class Player {
    score: number;
    highScore: number;
    games: Game[];
    snakeLives: Snake[];
    snakeLivesScore: number;
    id: number;

    constructor() {
        const level1 = new Game();
        this.snakeLives = [new Snake(level1, 10, 10), new Snake(level1, 10, 10), new Snake(level1, 10, 10)];
        level1.beasts = [this.snakeLives[0], new Snail(level1, 10, 10)]
        this.games = [level1]
        this.score = 0;
        this.snakeLivesScore = 0;
        this.highScore = 0;
        this.id = Math.random();
    }

    watchCollision() {
        if(this.games[0].isCollision) {
            this.restartGame() 
        }
    }

    restartGame() {
        if(this.snakeLives.length <= 1) {
            this.games[0].resetGame()
        } else {
            const snakeLife = this.snakeLives.splice(0, 1)[0]
            let snake = this.games[0].beasts[0] as Snake
            this.snakeLivesScore += snake.positions.length - 1;
            snakeLife.gameSpeedDelay = snake.gameSpeedDelay;
            snake = snakeLife
            this.games[0].startGame()
        }
        
    }

    resetAllGames() {
        this.snakeLivesScore = 0;
        if(this.games.length > 1) {
            this.games.splice(1)
        }
        const level1 = new Game()
        this.snakeLives = [new Snake(level1, 10, 10), new Snake(level1, 10, 10), new Snake(level1, 10, 10)];
        level1.beasts = [this.snakeLives[this.snakeLives.length - 1], new Snail(level1, 10, 10) ]
        this.games[0] = level1
    }

    setNewGame() {
        if(this.games.length >= 10) return
        const newLevel = new Game();
        newLevel.gameLimit = this.games[0].gameLimit
        newLevel.gridSize = this.games[0].gridSize
        const snakeLife = this.snakeLives[0]
        const snake = new Snake(newLevel, 10, 10)
        snake.gameSpeedDelay = snakeLife.gameSpeedDelay - 10 * (this.games.length)
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
                    new Snail(newLevel, 10, 10), 
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10)
                ];
                break;
            case 4:
                const mouse1 = new Mouse(newLevel, 10, 10); 
                mouse1.gameSpeedDelay = 1.5 * snake.gameSpeedDelay
                newLevel.beasts = [
                    snake, 
                    mouse1
                ];
                break;
            case 5:
                const mouse2 = new Mouse(newLevel, 10, 10); 
                mouse2.gameSpeedDelay = 1.5 * snake.gameSpeedDelay
                newLevel.beasts = [
                    snake, 
                    mouse2,
                    new Hedgehog(newLevel, 10, 10),
                ];
                break;
            case 6:
                const mouse3 = new Mouse(newLevel, 10, 10); 
                mouse3.gameSpeedDelay = 1.5 * snake.gameSpeedDelay
                newLevel.beasts = [
                    snake, 
                    mouse3,
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10),
                ];
                break;
            case 7: 
                const mouse4 = new Mouse(newLevel, 10, 10); 
                mouse4.gameSpeedDelay = 1.5 * snake.gameSpeedDelay
                newLevel.beasts = [
                    snake, 
                    mouse4,
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10),
                ];
                break;
            case 8:
                const mouse5 = new Mouse(newLevel, 10, 10); 
                const fox = new Fox(newLevel, 10, 10)
                mouse5.gameSpeedDelay = 1.5 * snake.gameSpeedDelay
                fox.gameInterval = snake.gameSpeedDelay
                newLevel.beasts = [
                    snake, 
                    mouse5,
                    new Hedgehog(newLevel, 10, 10),
                    fox
                ];
                break;
            case 9:
                const mouse6 = new Mouse(newLevel, 10, 10); 
                const fox1 = new Fox(newLevel, 10, 10)
                mouse6.gameSpeedDelay = 1.5 * snake.gameSpeedDelay
                fox1.gameInterval = snake.gameSpeedDelay
                newLevel.beasts = [
                    snake, 
                    mouse6,
                    new Hedgehog(newLevel, 10, 10),
                    new Hedgehog(newLevel, 10, 10),
                    fox1
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
        this.score += this.snakeLivesScore;
        
    }
  
    updateHighScore() {
        this.highScore = Math.max(this.score, this.highScore)
        if (typeof window !== 'undefined') {
            localStorage.setItem('bestScore', String(this.highScore))
        }
    }
}