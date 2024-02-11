
import logo from '~/public/images/snake.png'
import { Game } from '../Game';
import { Snake, type Cell } from './Snake'

export enum BeastNames {
    BEAST = 'Beast',
    SNAKE = 'Snake',
    HEDGEHOG = 'Hedgehog',
    SNAIL = 'Snail',
    FOX = 'Fox',
    EAGLE = 'Eagle',
    MOUSE = 'Mouse',
}

export class Beast {
    logo: typeof logo | null;
    game: Game;
    x: number;
    y: number;
    name: BeastNames;
    id: number;

    constructor(game: Game, x: number, y: number) {
        this.game = game
        this.x = x;
        this.y = y;
        this.logo = null;
        this.name = BeastNames.BEAST;
        this.id = Math.random();
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setRandomPosition() {
        let checkX = 0;
        let checkY = 0;
        const notAllowedCells: Cell[] = [];
        this.game.beasts?.forEach(item => {
            if(item.hasOwnProperty('positions')) {
                notAllowedCells.push(...item.positions)
            } else {
                notAllowedCells.push({x: item.x, y: item.y})
            }
        });
        do {
            checkX = Math.floor(Math.random() * this.game.gridSize) + 1;
            checkY = Math.floor(Math.random() * this.game.gridSize) + 1;
        } while (notAllowedCells.some(cell => cell.x === checkX && cell.y === checkY));

        this.x = checkX;
        this.y = checkY;
    }

}
  

  
  
  