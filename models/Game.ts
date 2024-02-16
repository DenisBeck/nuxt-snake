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
    beasts: Beast[]
    gameStatus: Status;
    snakeDirection: Direction;
    gridSize: number;
    isPassed: boolean;
    gameLimit: number;
    id: number;

    constructor() {
      this.beasts = []
      this.gameStatus = Status.STOPPED;
      this.snakeDirection = Direction.RIGHT;
      this.gridSize = 20;
      this.id = Math.random();
      this.isPassed = false;
      this.gameLimit = 41;
    }

    showPopup() {
      this.gameStatus = Status.PENDING
    }
  
    startGame() {
      this.gameStatus = Status.PLAYING;
      this.beasts.forEach(item => {
        if(item instanceof MovingBeast) {
          item.move()
        }
      });
    }

    pauseGame() {
      this.gameStatus = this.gameStatus === Status.PAUSED ? Status.PLAYING : Status.PAUSED
      this.beasts.forEach(item => {
        if(item instanceof MovingBeast) {
          item.move()
        }
      });
    }

    resetGame() {
      this.gameStatus = Status.RESTART
      this.beasts.forEach(item => {
        if(item instanceof MovingBeast) {
          clearInterval(item.gameInterval)
        }
      })
      const resetInterval = setTimeout(() => {this.stopGame(resetInterval)},2000)
    }

    stopGame(interval: ReturnType<typeof setTimeout> | number) {
      clearTimeout(interval)
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
      this.snakeDirection = Direction.UP;
    }
    moveLeft() {
      this.snakeDirection = Direction.LEFT;
    }
    moveRight() {
      this.snakeDirection = Direction.RIGHT;
    }
    moveDown() {
      this.snakeDirection = Direction.DOWN;
    }

    handleKeyPress(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          this.snakeDirection = Direction.UP;
          break;
        case 'ArrowDown':
          this.snakeDirection = Direction.DOWN;
          break;
        case 'ArrowLeft':
          this.snakeDirection = Direction.LEFT;
          break;
        case 'ArrowRight':
          this.snakeDirection = Direction.RIGHT;
          break;
        case ' ':
          this.pauseGame();
          break;
      }
    }
}
