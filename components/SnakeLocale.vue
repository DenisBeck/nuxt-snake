<script setup>
const { locale } = useI18n()
</script>

<template>
  <div class="locale">
    <form class="locale-form">
      <select class="locale-select" v-model="locale">
        <option class="locale-option" value="en">en</option>
        <option class="locale-option" value="ru">ru</option>
      </select>
      <p class="locale-greeting">{{ $t('Welcome To Snake Game') }}</p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.locale {
    margin: 0 auto;
    width: fit-content;
    padding: 40px 0;
    &-form {
        display: flex;
        flex-direction: column;
        
        align-items: center;
        gap: 50px
    }
    &-select {
        cursor: pointer;
        font-size: 24px;
        outline: none;

    }
    &-option {
        cursor: pointer;
    }
    &-greeting {
        font-size: 36px;
        font-weight: 700;
    }
}
</style>
