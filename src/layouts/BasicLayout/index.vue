<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <sider-menu
      :collapsed="collapsed"
      @moveRight="moveRight"
      @moveLeft="moveLeft" />
    <a-layout
      id="mainpager"
      ref="mainpager">
      <page-header
        :collapsed="collapsed"
        @trigger="(val) => {collapsed = val}" />
      <a-layout-content class="outer-container">
        <div class="inner-container">
          <router-view style="min-height: calc(100vh - 200px)" />
          <a-layout-footer style="textAlign: center">
            {{ VUE_APP_FOOTER }}
          </a-layout-footer>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SiderMenu from './SiderMenu'
import PageHeader from './Header/index'
const move = require('move-js')

export default {
  components: { SiderMenu, PageHeader },
  data () {
    return {
      VUE_APP_FOOTER: process.env.VUE_APP_FOOTER,
      collapsed: false
    }
  },
  watch: {
    '$store.state.menu.showsmallMenu' (newVal, old) {
      if (!newVal) {
        this.moveLeft()
      }
    }
  },
  methods: {
    moveRight () {
      move(this.$refs['mainpager'].$el)
        .to(256, 0)
        .end()
    },
    moveLeft () {
      move(this.$refs['mainpager'].$el)
        .to(0, 0)
        .end()
    }
  }
}
</script>

<style scoped>
#components-layout-demo-custom-trigger {
  height: 100vh;
}

#components-layout-demo-custom-trigger .outer-container {
  position: relative;
  margin: 0 16px;
  min-height: 300px;
  padding-top: 16px;
  overflow: hidden;
}

#components-layout-demo-custom-trigger .inner-container {
  position: absolute;
  left: 0;
  top: 16px;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
