import { Beast, BeastNames } from "./Beast";

import mouseImage from '~/public/images/mouse.png';
import { Direction, type Game } from "../Game";
import { MovingBeast } from "./MovingBeast";
import type { Cell, Snake } from "./Snake";

export class Mouse extends MovingBeast {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.logo = mouseImage;
        this.name = BeastNames.MOUSE;
    }

    isCellWithSnake(cell: Cell) {
        const snake = this.game.beasts[0] as Snake
        snake.positions.forEach(item => {
            if(item.x === cell.x && item.y === cell.y) {
                return true
            }
        })
        return false
    }

    stepByDirection() {
        switch (this.direction) {
            case Direction.UP:
                if((this.y > 1) && (!this.isCellWithSnake({x: this.x, y: this.y - 1}))) {
                    this.y--;
                }
                break;
            case Direction.DOWN:
                if((this.y < this.game.gridSize - 1) && (!this.isCellWithSnake({x: this.x, y: this.y + 1}))) {
                    this.y++;
                }
                break;
            case Direction.LEFT:
                if(this.x > 1 && (!this.isCellWithSnake({x: this.x - 1, y: this.y}))) {
                    this.x--;
                }
                break;
            case Direction.RIGHT:
                if((this.x < this.game.gridSize - 1) && (!this.isCellWithSnake({x: this.x + 1, y: this.y}))) {
                    this.x++;
                }
                break;
        }
        this.setPosition(this.x, this.y)
    }

    meetSnake() {
        const snake = this.game.beasts[0] as Snake;
        snake.positions.forEach(item => {
            if(Math.abs(item.x - this.x) === 1) {
                this.direction = this.direction === Direction.LEFT ? Direction.RIGHT : Direction.LEFT
            }
            if(Math.abs(item.y - this.y) === 1) {
                this.direction = this.direction === Direction.DOWN ? Direction.UP : Direction.DOWN
            }
        })
        // const head = snake.positions[0]
        // if (head.x === this.x && head.y === this.y) {
        //     console.log('sdfsdfsdf')
        //     this.setRandomPosition();
        //     this.move();
        //     clearInterval(this.changeDirectionInterval)
        // } 
    }

    
}