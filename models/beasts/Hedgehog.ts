import { Beast, BeastNames } from "./Beast";

import snake from '../../assets/snake.png';
import type { Game } from "../Game";

export class Bishop extends Beast {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.logo = snake;
        this.name = BeastNames.SNAKE;
    }

    // canMove(target: Cell): boolean {
    //     if(!super.canMove(target)) {
    //         return false;
    //     }
    //     if(this.cell.isEmptyDiagonal(target)) {
    //         return true;
    //     }
    //     return false;
    // }
}