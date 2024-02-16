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
      if(this.game.gameStatus === Status.PLAYING) {
          this.gameInterval = setInterval(() => {
            if(this.game.gameStatus !== Status.PAUSED) {
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
        
              const neck = {...this.positions[1]}
              const food = this.game.beasts[1]
              if ((head.x === food.x || neck.x === food.x) && (head.y === food.y || neck.y === food.y)) {
                food.setRandomPosition();
                
                this.increaseSpeed();
                if(!this.game.isPassed) {
                  this.game.passGame()
                }
                clearInterval(this.gameInterval);
                this.move();
              } else {
                this.positions.pop();
              }
            }
            
          }, this.gameSpeedDelay)
      } else {
          clearInterval(this.gameInterval)
      }
    }

    checkCollision() {
      const head = this.positions[0];
      const hedgehog = this.game.beasts[2];
    
      if (head.x < 1 || head.x > this.game.gridSize || head.y < 1 || head.y > this.game.gridSize) {
        this.game.resetGame();
        clearInterval(this.gameInterval)
      }

      if(hedgehog) {
        if (head.x === hedgehog.x && head.y === hedgehog.y) {
          this.game.resetGame();
          clearInterval(this.gameInterval)
        }
      }
    
      for (let i = 1; i < this.positions.length; i++) {
        if (head.x === this.positions[i].x && head.y === this.positions[i].y) {
          this.game.resetGame();
          clearInterval(this.gameInterval)
        }
      }
    }
}



  

  