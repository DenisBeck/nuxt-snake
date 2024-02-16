import { type Game, Status } from "../Game";
import { Beast } from "./Beast";
import { Direction } from  '../Game'

export class MovingBeast extends Beast {
    direction: Direction;
    gameSpeedDelay: number;
    gameInterval: ReturnType<typeof setTimeout> | number;
    changeDirectionInterval: ReturnType<typeof setTimeout> | number;

    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.direction = Direction.LEFT;
        this.gameSpeedDelay = 1000;
        this.changeDirectionInterval = 0;
        this.gameInterval = 0;
    }

    setRandomDirection() {
        const randomValue: number = Math.floor(Math.random() * 4);
        const directions: Direction[] = [Direction.RIGHT, Direction.DOWN, Direction.LEFT, Direction.UP]
        this.direction = directions[randomValue]
    }

    meetSnake() {

    }

    increaseSpeed() {
        if (this.gameSpeedDelay > 850) {
          this.gameSpeedDelay -= 25;
        } else if (this.gameSpeedDelay > 650) {
          this.gameSpeedDelay -= 20;
        } else if (this.gameSpeedDelay > 400) {
          this.gameSpeedDelay -= 15;
        } else if (this.gameSpeedDelay > 150) {
          this.gameSpeedDelay -= 5;
        } else if (this.gameSpeedDelay > 100) {
          this.gameSpeedDelay -= 3;
        } else if (this.gameSpeedDelay > 50) {
          this.gameSpeedDelay -= 2;
        } else if (this.gameSpeedDelay > 25) {
          this.gameSpeedDelay -= 1;
        }
      }
    
    stepByDirection() {
        switch (this.direction) {
            case Direction.UP:
                if(this.y > 1) {
                    this.y--;
                }
                break;
            case Direction.DOWN:
                if(this.y < this.game.gridSize - 1) {
                    this.y++;
                }
                break;
            case Direction.LEFT:
                if(this.x > 1) {
                    this.x--;
                }
                break;
            case Direction.RIGHT:
                if(this.x < this.game.gridSize - 1) {
                    this.x++;
                }
                break;
        }
        this.setPosition(this.x, this.y)
    }

    move() {
        if(this.game.gameStatus === Status.PLAYING) {
            this.changeDirectionInterval = setInterval(() =>{this.setRandomDirection()}, 2500)
            this.gameInterval = setInterval(() => {
                this.stepByDirection()
            }, this.gameSpeedDelay)
        } else {
            clearInterval(this.gameInterval)
            clearInterval(this.changeDirectionInterval)
        }
    }

}