import { type Game, Status } from "../Game";
import { Beast } from "./Beast";
import { Direction } from  '../Game'

export class MovingBeast extends Beast {
    direction: Direction;
    gameSpeedDelay: number;
    gameInterval: ReturnType<typeof setTimeout> | number;

    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.direction = Direction.LEFT;
        this.gameSpeedDelay = 1000;
        this.gameInterval = 0;
    }

    setRandomDirection() {
        const randomValue: number = Math.floor(Math.random() * 4) + 1;
        const directions: Direction[] = [Direction.RIGHT, Direction.DOWN, Direction.LEFT, Direction.UP]
        this.direction = directions[randomValue]
    }

    move() {
        if(this.game.gameStatus = Status.PLAYING) {
            this.gameInterval = setInterval(() => {
                switch (this.direction) {
                case Direction.UP:
                    this.y--;
                    break;
                case Direction.DOWN:
                    this.y++;
                    break;
                case Direction.LEFT:
                    this.x--;
                    break;
                case Direction.RIGHT:
                    this.x++;
                    break;
                }
                this.setPosition(this.x, this.y)
            }, this.gameSpeedDelay)
        } else {
            clearInterval(this.gameInterval)
        }
    }
}