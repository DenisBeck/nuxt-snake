import { Beast, BeastNames } from "./Beast";
import type { Game } from "../Game";

import hedgehogImage from '~/public/images/hedgehog.png'

export class Hedgehog extends Beast {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.logo = hedgehogImage;
        this.name = BeastNames.HEDGEHOG;
    }
}