import type { Beast } from "./beasts/Beast";
import { MovingBeast } from "./beasts/MovingBeast";
import { Snake } from "./beasts/Snake";

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum Status {
  PLAYING = 'playing',
  STOPPED = 'stopped',
  RESTART = 'restart',
  PAUSED = 'paused',
  PENDING = 'pending'
}

export class Game {
    beasts: Beast[];
    gameStatus: Status;
    snakeDirection: Direction;
    gridSize: number;
    isPassed: boolean;
    isCollision: boolean;
    gameLimit: number;
    id: number;

    constructor() {
      this.beasts = [];
      this.gameStatus = Status.STOPPED;
      this.snakeDirection = Direction.RIGHT;
      this.gridSize = 20;
      this.id = Math.random();
      this.isPassed = false;
      this.isCollision = false;
      this.gameLimit = 41;
    }

    showPopup() {
      this.gameStatus = Status.PENDING
    }

    startGame() {
      this.setCollision(false)
      this.gameStatus = Status.PLAYING;
      if(this.isPassed) {
        this.beasts.forEach(item => {
          if(item instanceof MovingBeast) {
            item.move()
          }
        })
      } else {
        this.beasts.forEach(item => {
          item.setRandomPosition()
          if(item instanceof Snake) {
            item.positions = [{x: 10, y: 10}]
          }
          if(item instanceof MovingBeast) {
            clearInterval(item.gameInterval)
            item.move()
          }
        });
      }
      
    }

    pauseGame() {
      this.gameStatus = this.gameStatus === Status.PAUSED ? Status.PLAYING : Status.PAUSED
      this.beasts.forEach(item => {
        if(item instanceof MovingBeast) {
          item.move()
        }
      });
    }

    setCollision(collision: boolean = true) {
      this.isCollision = collision;
      this.beasts.forEach(item => {
        if(item instanceof MovingBeast) {
          clearInterval(item.gameInterval)
        }
      })
    }

    resetGame() {
      this.gameStatus = Status.RESTART
      this.beasts.forEach(item => {
        if(item instanceof MovingBeast) {
          clearInterval(item.gameInterval)
        }
      })
    }

    stopGame() {
      console.log('stopped')
      this.gameStatus = Status.STOPPED;
    }

    passGame() {
      const snake = this.beasts[0]
      if (snake instanceof Snake && snake.positions.length >= this.gameLimit) {
        this.isPassed = true;
        this.pauseGame();
      }
    }

    moveUp() {
      const snake = this.beasts[0] as Snake
      if(snake?.positions.length === 1 || this.snakeDirection !== Direction.DOWN)
      this.snakeDirection = Direction.UP;
    }
    moveLeft() {
      const snake = this.beasts[0] as Snake
      if(snake?.positions.length === 1 || this.snakeDirection !== Direction.RIGHT)
      this.snakeDirection = Direction.LEFT;
    }
    moveRight() {
      const snake = this.beasts[0] as Snake
      if(snake?.positions.length === 1 || this.snakeDirection !== Direction.LEFT)
      this.snakeDirection = Direction.RIGHT;
    }
    moveDown() {
      const snake = this.beasts[0] as Snake
      if(snake?.positions.length === 1 || this.snakeDirection !== Direction.UP)
      this.snakeDirection = Direction.DOWN;
    }

    handleKeyPress(event: KeyboardEvent) {
      const snake = this.beasts[0] as Snake
      switch (event.key) {
        case 'ArrowUp':
          if(snake?.positions.length === 1 || this.snakeDirection !== Direction.DOWN) {
            this.snakeDirection = Direction.UP;
          }
          break;
        case 'ArrowDown':
          if(snake?.positions.length === 1 || this.snakeDirection !== Direction.UP) {
            this.snakeDirection = Direction.DOWN;
          }
          break;
        case 'ArrowLeft':
          if(snake?.positions.length === 1 || this.snakeDirection !== Direction.RIGHT) {
            this.snakeDirection = Direction.LEFT;
          }
          break;
        case 'ArrowRight':
          if(snake?.positions.length === 1 || this.snakeDirection !== Direction.LEFT) {
            this.snakeDirection = Direction.RIGHT;
          }
          break;
        case ' ':
          this.pauseGame();
          break;
      }
    }
}
