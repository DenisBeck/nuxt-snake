import { Player } from "~/models/Player"
import { Game } from "~/models/Game"
import { Snake } from "~/models/beasts/Snake"
import { Snail } from "~/models/beasts/Snail"

export default () => {
    const player = ref(new Player())
    const game = computed(() => player.value.games[0])
    const snake = computed(() => game.value.beasts[0] as Snake)
    const snail = computed(() => game.value.beasts[1])
    snail.value.setRandomPosition()

    watch(player.value.games, () => {
        if(game.value.gameStatus === 'restart') {
            setTimeout(() => {
                player.value.updateGame();
                snail.value.setRandomPosition()
            }, 2000)
            
        }
        player.value.updateScore()
        player.value.updateHighScore();
    })
    
    
    return {
        snake,
        snail,
        game,
        player
    }
}