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
        <span class="score-value">{{player.score  }}</span>
      </div>
      <div class="score">
        <snake-text class="score-label" text="Best Score" />
        <span class="score-value">{{ player.highScore }}</span>
      </div>
    </div>
    <snake-board />
    <div v-if="game.gameStatus === 'playing'">
      <div class="game-clue">
        <snake-text text="Use" />
        <p>&#129092; &#129094; &#129093; &#129095; </p>
        <snake-text class="clue-text" text="for navigation" />
      </div>
      <div class="game-description">
        <snake-text text="Snake" />
        <img :src="snake.logo" :alt="snake.name" />
        <snake-text text="eats snails" /> 
        <img :src="snail.logo" :alt="snail.name" />
      </div>
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
  padding-inline: 10px;
}
.game-scores {
  display: flex;
  gap: 60px;
  justify-content: space-between;
  text-align: center;
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
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-size: 28px;
  @media(max-width: 430px) {
    font-size: 20px;
    gap: 5px;
  }
}
.game-clue {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
  @media(max-width: 430px) {
    font-size: 20px;
  }
}
.clue-text {
  @media(max-width: 500px) {
    display: none;
  }
}
</style>
