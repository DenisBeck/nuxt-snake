<script setup>
const { game, snake, snail } = inject('gameProps')

const startGame = () => {
    game.value.startGame()
    snake.value.move()
}

const onKeyPress = (event) => {
    game.value.handleKeyPress(event)
}

onMounted(() => {
    window.addEventListener('keydown', onKeyPress)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyPress)
})

</script>

<template>
    <div class="game-border">
        <div class="game-board">
            <template v-if="snake && game.gameStatus === 'playing'">
                <div v-for="position in snake.positions"
                    :key="position"
                    class="snake" 
                    :style="{gridColumn: position.x, gridRow: position.y}"
                >
                </div>
            </template>
            <div v-if="snail && game.gameStatus === 'playing'" 
                class="snail" 
                :style="{gridColumn: snail.x, gridRow: snail.y}"
            >
            </div>
            <div v-if="game.gameStatus === 'restart'" class="startscreen">
                <snake-text class="restart-text" text="Game Over" />
            </div>
        </div>
        <div v-if="game.gameStatus === 'stopped'" class="startscreen"> 
            <img class="startscreen-logo" src="/images/logo.png" alt="logo">
            <button @click="startGame" class="startscreen-text">{{ $t('Start') }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.game-border {
    border: 5px solid #10500a;
    width: fit-content;
    height:fit-content;
    position: relative;
}
.game-board {
  display: grid;
  grid-template-columns: repeat(20, minmax(auto, 20px));
  grid-template-rows: repeat(20, minmax(auto, 20px));
  background: #dfdfdf;
}
.startscreen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    &-logo {
        max-width: 100%;
        margin-bottom: 20px;
    }
    &-text {
        max-width: 120px;
        background: #10500a;
        color: #dfdfdf;
        padding: 10px 30px;
        border-radius: 8px;

    }
}

.snake {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 50%;
    &:first-child {
        background: url('/images/snake.png') center/contain no-repeat;
    }
    &-wrapper {
        position: absolute;
    }
}
.snail {
    background: url('/images/snail.png') center/contain no-repeat;
}

.restart-text {
    font-size: 54px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: -0.1;
}
</style>