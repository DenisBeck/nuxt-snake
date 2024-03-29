// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/public/scss/style.scss'],
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  }
})
