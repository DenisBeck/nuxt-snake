import type { Game } from "../Game";
import { BeastNames } from "./Beast";

import foxImage from '~/public/images/fox.png'
import { MovingBeast } from "./MovingBeast";
import type { Snake } from "./Snake";

export class Fox extends MovingBeast {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.logo = foxImage;
        this.name = BeastNames.FOX;
    }

    meetSnake() {
        const snake = this.game.beasts[0] as Snake;
        console.log('sdfsdffs')
        snake.positions.forEach(item => {
            if(this.x === item.x && this.y === item.y) {
                clearInterval(snake.gameInterval)
                clearInterval(this.gameInterval)
                this.game.setCollision();
            }
        })
    }
}