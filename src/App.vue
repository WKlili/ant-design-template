<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import i18n from './assets/lang/i18n'

export default {
  data () {
    return {
      locale: i18n
    }
  },
  created () {
    const t = this
    window.addEventListener(
      'selectLanguage',
      function (e) {
        i18n.locale = e.detail
        t.locale = i18n
      },
      false
    )
  },
  destroyed () {
    window.removeEventListener('selectLanguage', { passive: false })
  }
}
</script>

<style scoped>
#app,
body,
html {
  height: 100%;
}
</style>
