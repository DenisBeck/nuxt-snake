import { Player } from "~/models/Player"
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
    const hedgehog1 = computed(() => game.value?.beasts[2])
    const hedgehog2 = computed(() => game.value?.beasts[3])
    snail.value?.setRandomPosition()
    mouse.value?.setRandomPosition()
    hedgehog1.value?.setRandomPosition()
    hedgehog2.value?.setRandomPosition()

    watch(() => player.value.games.length, () => {
        snail.value?.setRandomPosition()
        mouse.value?.setRandomPosition()
        hedgehog1.value?.setRandomPosition()
        hedgehog2.value?.setRandomPosition()
    })

    watch(player.value.games, () => {
        if(game.value.gameStatus === 'restart') {
            setTimeout(() => {
                player.value.restartGame();
                snail.value?.setRandomPosition()
                mouse.value?.setRandomPosition()
                hedgehog1.value?.setRandomPosition()
                hedgehog2.value?.setRandomPosition()
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
        hedgehog1,
        hedgehog2
    }
}