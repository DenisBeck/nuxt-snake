<script setup>
const props = defineProps({
    game: Object,
    snake: Object
})

const inputRef = ref(null)

onMounted(() => {
    
  if(inputRef.value) {
    inputRef.value.focus()
  }
})

watchEffect(() => {
  if(inputRef.value) {
    inputRef.value.onblur = () => {
      if(Number(inputRef.value.value) < inputRef.value.min) {
        inputRef.value.value = inputRef.value.min;
        props.game.gameLimit = inputRef.value.min;
      } else if(Number(inputRef.value.value) > inputRef.value.max) {
        inputRef.value.value = inputRef.value.max;
        props.game.gameLimit = inputRef.value.max;
      }
    }
  }
})

</script>

<template>
    <div class="game-options">
        <snake-text class="game-options-title" text="Set custom options or submit defaults" />
        <div class="game-options-size">
            <snake-text class="size-title" text="Field side size" />
            <div class="size-items">
                <div class="size-item">
                    <input type="radio" id="size-15" v-model="game.gridSize" value="15">
                    <label for="size-15">15</label>
                </div>
                <div class="size-item">
                    <input type="radio" id="size-20" v-model="game.gridSize" value="20">
                    <label for="size-20">20</label>
                </div>
                <div class="size-item">
                    <input type="radio" id="size-25" v-model="game.gridSize" value="25">
                    <label for="size-25">25</label>
                </div>
            </div>
        </div>
        <div class="game-options-limit">
            <snake-text class="limit-title" text="Snake size limit to pass the game" />
            <input class="limit-item" type="number" ref="inputRef" min="10" max="100" v-model="game.gameLimit">
        </div>
        <div class="game-options-speed">
            <snake-text class="speed-title" text="Speed mode" />
            <div class="speed-items">
                <div class="speed-item">
                    <input type="radio" id="speed-800" v-model="snake.gameSpeedDelay" value="800">
                    <label for="speed-800">{{ $t('Slow') }}</label>
                </div>
                <div class="speed-item">
                    <input type="radio" id="speed-500" v-model="snake.gameSpeedDelay" value="500">
                    <label for="speed-500">{{ $t('Normal') }}</label>
                </div>
                <div class="speed-item">
                    <input type="radio" id="speed-300" v-model="snake.gameSpeedDelay" value="300">
                    <label for="speed-300">{{ $t('Fast') }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.game-options {
    width: 100%;
}
.game-options-title {
    font-size: 36px;
    margin-bottom: 15px;
    text-align: center;
}
.game-options-limit,
.game-options-speed,
.game-options-size {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 20px;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
}

.size-title,
.limit-title,
.speed-title {
    font-weight: 700;
    margin-bottom: 10px;
}
.size-items,
.speed-items {
    display: flex;
    flex-wrap: wrap;
    column-gap: 30px;
    row-gap: 10px;
}
.size-item,
.speed-item {
    display: flex;
    gap: 5px;
}
.limit-item {
    width: 100%;
    padding: 5px 10px;
    outline: none;
    transition: all 0.3s ease 0s;
    border-radius: 5px;
    &:focus {
        box-shadow: 2px 2px 5px #000;
    }
}

</style>