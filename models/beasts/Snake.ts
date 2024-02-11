import { Game, Direction, Status } from "../Game";
import { MovingBeast } from "./MovingBeast";
import { Beast, BeastNames } from "./Beast";

import snakeImage from '~/public/images/snake.png';

export interface Cell {
  x: number;
  y: number;
}

export class Snake extends MovingBeast {
    positions: Cell[]

    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.positions = [{x, y}]
        this.logo = snakeImage;
        this.name = BeastNames.SNAKE;
        this.direction = game.snakeDirection
    }

    move() {
      if(this.game.gameStatus = Status.PLAYING) {
          this.gameInterval = setInterval(() => {
            const head = {...this.positions[0]}
            switch (this.game.snakeDirection) {
            case Direction.UP:
                head.y--;
                break;
            case Direction.DOWN:
                head.y++;
                break;
            case Direction.LEFT:
                head.x--;
                break;
            case Direction.RIGHT:
                head.x++;
                break;
            }
            this.positions.unshift(head);
            this.checkCollision();
      
            const food = this.game.beasts[1]
            if (head.x === food.x && head.y === food.y) {
              food.setRandomPosition();
              
              this.increaseSpeed();
              clearInterval(this.gameInterval);
              this.move();
            } else {
              this.positions.pop();
            }
          }, this.gameSpeedDelay)
      } else {
          clearInterval(this.gameInterval)
      }
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

    checkCollision() {
      const head = this.positions[0];
    
      if (head.x < 1 || head.x > this.game.gridSize || head.y < 1 || head.y > this.game.gridSize) {
        this.game.resetGame();
        clearInterval(this.gameInterval)
      }
    
      for (let i = 1; i < this.positions.length; i++) {
        if (head.x === this.positions[i].x && head.y === this.positions[i].y) {
          this.game.resetGame();
          clearInterval(this.gameInterval)
        }
      }
    }
}



  

  