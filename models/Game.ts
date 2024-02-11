import type { Beast } from "./beasts/Beast";
import { Snail } from "./beasts/Snail";
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
  PAUSED = 'paused'
}

export class Game {
    beasts: Beast[]
    gameStatus: Status;
    snakeDirection: Direction;
    gridSize: number;
    id: number;

    constructor() {
      this.beasts = [new Snake(this, 10, 10), new Snail(this, 10, 10) ]
      this.gameStatus = Status.STOPPED;
      this.snakeDirection = Direction.RIGHT;
      this.gridSize = 20;
      this.id = Math.random();
    }

    startGame() {
      this.gameStatus = Status.PLAYING;
    }

    resetGame() {
      this.gameStatus = Status.RESTART
      const resetInterval = setTimeout(() => {this.stopGame(resetInterval)},2000)
    }

    stopGame(interval: ReturnType<typeof setTimeout> | number) {
      clearTimeout(interval)
      this.gameStatus = Status.STOPPED;
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
      }
    }
}
