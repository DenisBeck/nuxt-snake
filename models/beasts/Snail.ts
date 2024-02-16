import type { Game } from "../Game";
import { Beast, BeastNames } from "./Beast";

import snailImage from '~/public/images/snail.png';

export class Snail extends Beast {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.logo = snailImage;
        this.name = BeastNames.SNAIL;
    }
}