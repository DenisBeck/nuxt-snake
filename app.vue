<script setup>
const { player, game, snake, snail } = useSnakeBoard();

provide('gameProps', { game, snake, snail })

onMounted(() => {
  if(localStorage.getItem('bestScore')) {
    player.value.highScore = Number(localStorage.getItem('bestScore'))
  }
})

</script>
<template>
  <div class="game-page">
    <header class="game-header">
      <snake-locale />
    </header>
    <div class="game-scores">
      <div class="score">
        <snake-text class="score-label" text="Current Score" />
        <snake-text class="score-value" :text="player.score" />
      </div>
      <div class="score">
        <snake-text class="score-label" text="Best Score" />
        <snake-text class="score-value" :text="player.highScore" />
      </div>
    </div>
    <snake-board />
    <div v-if="game.gameStatus === 'playing'" class="game-description">
      <snake-text text="Snake" />
      <img :src="snake.logo" :alt="snake.name" />
      <snake-text text="eats snails" /> 
      <img :src="snail.logo" :alt="snail.name" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-header {
  margin-bottom: 100px;
}
.game-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
}
.game-scores {
  display: flex;
  gap: 60px;
  justify-content: space-between;
}
.score {
  margin-bottom: 10px;
  &-label {
    margin-bottom: 10px;
    font-size: 24px;
  }
  &-value {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
  }
}
.game-description {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
  font-size: 28px;
}
</style>
