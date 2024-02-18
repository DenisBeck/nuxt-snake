import { Player } from "~/models/Player"
import { Fox } from "~/models/beasts/Fox"
import { Hedgehog } from "~/models/beasts/Hedgehog"
import { Mouse } from "~/models/beasts/Mouse"
import { Snail } from "~/models/beasts/Snail"
import { Snake } from "~/models/beasts/Snake"

export default () => {
    const player = ref(new Player())
    const game = computed(() => player.value.games[0])
    const snake = computed(() => game.value.beasts[0] as Snake)
    const snail = computed(() => {
        const food = game.value.beasts[1]
        return (food instanceof Snail) ? food : null
    })
    const mouse = computed(() => {
        const food = game.value.beasts[1]
        return (food instanceof Mouse) ? food : null
    })
    const fox = computed(() => game.value?.beasts.find(item => item instanceof Fox))
    const hedgehogs = computed(() => game.value?.beasts.filter(item => item instanceof Hedgehog))

    watch(player.value.games, () => {
        player.value.watchCollision()
        if(game.value.gameStatus === 'restart' && game.value.isCollision) {
            setTimeout(() => {
                player.value.resetAllGames();
            }, 2000)
        }
        player.value.updateScore()
        player.value.updateHighScore();
    })
    
    
    return {
        snake,
        snail,
        mouse,
        game,
        player,
        hedgehogs,
        fox
    }
}