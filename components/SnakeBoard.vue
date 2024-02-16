<script setup>
const { game, snake, snail, mouse, hedgehog1, hedgehog2 } = inject('gameProps')


onMounted(() => {
    window.addEventListener('keydown', (e) => game.value.handleKeyPress(e))
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', (e) => game.value.handleKeyPress(e))
})

</script>

<template>
    <div class="game-border">
        <div class="game-board" @click.stop="game.pauseGame()">
            <template v-if="snake && (game.gameStatus === 'playing' || game.gameStatus === 'paused')">
                <div v-for="position in snake.positions"
                    :key="position"
                    class="snake" 
                    :style="{gridColumn: position.x, gridRow: position.y}"
                >
                </div>
            </template>
            <div v-if="snail && (game.gameStatus === 'playing' || game.gameStatus === 'paused')" 
                class="snail" 
                :style="{gridColumn: snail.x, gridRow: snail.y}"
            >
            </div>
            <div v-if="mouse && (game.gameStatus === 'playing' || game.gameStatus === 'paused')" 
                class="mouse" 
                :style="{gridColumn: mouse.x, gridRow: mouse.y}"
            >
            </div>
            <div v-if="hedgehog1 && (game.gameStatus === 'playing' || game.gameStatus === 'paused')" 
                class="hedgehog" 
                :style="{gridColumn: hedgehog1.x, gridRow: hedgehog1.y}"
            >
            </div>
            <div v-if="hedgehog2 && (game.gameStatus === 'playing' || game.gameStatus === 'paused')" 
                class="hedgehog" 
                :style="{gridColumn: hedgehog2.x, gridRow: hedgehog2.y}"
            >
            </div>
            <div v-if="game.gameStatus === 'restart'" class="startscreen">
                <snake-text class="restart-text" text="Game Over" />
            </div>
        </div>
        <div 
            v-if="game.gameStatus === 'stopped' || game.gameStatus === 'pending'" 
            class="startscreen"
        > 
            <img class="startscreen-logo" src="/images/logo.png" alt="logo">
            <button @click="game.showPopup" class="startscreen-text">{{ $t('Start') }}</button>
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
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  background: #dfdfdf;
  @media(max-width: 430px) {
    grid-template-columns: repeat(20, 14px);
    grid-template-rows: repeat(20, 14px);
  }
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
        border: 1px solid #10500a;
        color: #dfdfdf;
        padding: 10px 30px;
        border-radius: 8px;
        transition: all 0.3s ease 0s;
        &:hover {
            color: #10500a;
            background: #dfdfdf;
        }
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
.hedgehog {
    background: url('/images/hedgehog.png') center/contain no-repeat;
}
.mouse {
    background: url('/images/mouse.png') center/contain no-repeat;
}

.restart-text {
    font-size: 54px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: -0.1;
}
</style>