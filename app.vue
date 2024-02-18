<script setup>
const { player, game, snake, snail, mouse, hedgehogs, fox } = useSnakeBoard();

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
    <div class="game-lives">
      <div v-for="(life,index) in player.snakeLives" :key="index" class="game-life">
        <img 
          :src="life.logo" :alt="life.name" 
          :class="{'game-flick': index === player.snakeLives.length - 1 && game.gameStatus === 'playing'}"
        >
      </div>
    </div>
    <snake-board 
      :gridSize="Number(game.gridSize)"
      :game="game"
      :snake="snake"
      :snail="snail"
      :mouse="mouse"
      :hedgehogs="hedgehogs"
      :fox="fox"
    />
    <div v-if="game.gameStatus === 'playing'">
      <div class="game-control">
        <div class="game-control-line"><button @click="game.moveUp()" class="game-button">&#129093;</button></div>
        <div class="game-control-line">
          <button @click="game.moveLeft()" class="game-button">&#129092;</button>
          <button @click="game.pauseGame()" class="game-button">&#9208;</button>
          <button @click="game.moveRight()" class="game-button">&#129094;</button>
        </div>
        <div class="game-control-line"><button @click="game.moveDown()" class="game-button">&#129095;</button></div>
      </div>
      <div>
        <div v-if="snail" class="game-description">
          <snake-text text="Snake" />
          <img :src="snake.logo" :alt="snake.name" />
          <snake-text text="eats snails" /> 
          <img :src="snail.logo" :alt="snail.name" />
        </div>
        <div v-if="mouse" class="game-description">
          <snake-text text="Snake" />
          <img :src="snake.logo" :alt="snake.name" />
          <snake-text text="eats mouses" /> 
          <img :src="mouse.logo" :alt="mouse.name" />
        </div>
        <div v-if="hedgehogs.length" class="game-description">
          <snake-text text="Hedgehogs" />
          <img :src="hedgehogs[0].logo" :alt="hedgehogs[0].name" />
          <snake-text text="kill snake" /> 
          <img :src="snake.logo" :alt="snake.name" />
        </div>
        <div v-if="fox" class="game-description">
          <snake-text text="Fox" />
          <img :src="fox.logo" :alt="fox.name" />
          <snake-text text="hunts snakes" /> 
          <img :src="snake.logo" :alt="snake.name" />
        </div>
      </div>
    </div>
    <div v-if="game.gameStatus === 'paused'">
      <snake-text class="game-paused" text="Paused" />
      <snake-text class="game-paused-desc" text="Press key SPACE or click on the game field" />
    </div>
  </div>
  <Teleport to="body">
    <snake-popup v-if="game.gameStatus === 'pending'">
			<div class="popup-new-game-text">
        <snake-text text="Your level: " />{{ player.games.length }}
      </div>
      <snake-options v-if="player.games.length === 1" :game="game" :snake="snake" />
			<button type="button" @click="game.startGame()" class="popup-close">{{ $t('Go!') }}</button>
    </snake-popup>
    <snake-popup v-if="game.gameStatus === 'paused' && game.isPassed">
      <div class="popup-victory-text">
        <snake-text class="popup-new-game-text" text="Victory!!!" />
        <snake-text  text="This level is passed! You may continue playing this game or begin new level" />
      </div>
      <div class="popup-buttons">
        <button type="button" @click="game.startGame()" class="popup-close">{{ $t('Go on playing here') }}</button>
        <button type="button" @click="player.setNewGame()" class="popup-close">{{ $t('Begin new level') }}</button>
      </div>
    </snake-popup>
  </Teleport>
</template>

<style lang="scss" scoped>
.game-header {
  margin-bottom: 30px;
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
  margin-bottom: 20px;
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

.game-lives {
  height: 30px;
  margin: 0 auto 10px;
  display: flex;
  gap: 20px;
  align-self: flex-start;
  width: 410px;

  img {
    height: 100%;
    max-height: 100%;
    &.game-flick {
      animation: flick 1.5s ease infinite; 
    }
  }
  @media(max-width: 430px) {
    width: 290px
  }
}

.game-description {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-size: 28px;
  height: 30px;
  img {
    height: 100%;
    max-height: 100%;
  }

  @media(max-width: 430px) {
    font-size: 20px;
    gap: 5px;
  }
}
.game-control {
  margin-top: 15px;
  margin-bottom: 20px;
  &-line {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    &:not(:last-child) {margin-bottom: 20px;}
  }
}
.game-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  background: #dfdfdf;
  width: 40px;
  height: 40px;
}
.game-paused {
  margin-top: 50px;
  font-size: 54px;
  font-weight: 700;
  text-transform: uppercase;
  animation: flick 1.5s ease infinite; 
  text-align: center;
  margin-bottom: 15px;
  &-desc {
    text-align: center;
  }
}

.popup-new-game-text {
	display: flex;
	gap: 10px;
	text-transform: uppercase;
	font-size: 36px;
	text-align: center;
	font-weight: 700;
}

.popup-victory-text {
	display: flex;
  flex-direction: column;
  align-items: center;
	gap: 20px;
	font-size: 36px;
	text-align: center;
}
.popup-close {
  color: #10500a;
  padding: 10px 30px;
  border-radius: 8px;
  background: #dfdfdf;
	font-weight: 700;
	font-size: 28px;
	transition: all 0.3s ease 0s;
	&:hover {
		color: #dfdfdf;
		background: #10500a;
	}
}
.popup-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  width: fit-content;
}

@keyframes flick {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
