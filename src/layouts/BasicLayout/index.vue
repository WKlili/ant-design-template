<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <sider-menu
      :collapsed="collapsed"
      @moveRight="moveRight"
      @moveLeft="moveLeft" />
    <a-layout
      ref="mainpager"
      class="mainpager">
      <a-icon
        v-if="$store.state.menu.showBigMenu"
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="collapsed = !collapsed" />
      <page-header
        :collapsed="collapsed" />
      <breadcrumb
        :style="{paddingLeft: '20px',
                 height: '45px'}" />
      <a-layout-content class="outer-container">
        <div class="inner-container">
          <router-view style="min-height: calc(100vh - 200px)" />
          <a-layout-footer class="footer">
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
import Breadcrumb from './Header/Breadcrumb'
const move = require('move-js')

export default {
  components: { SiderMenu, PageHeader, Breadcrumb },
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
      move(this.$refs.mainpager.$el)
        .to(256, 0)
        .end()
    },
    moveLeft () {
      move(this.$refs.mainpager.$el)
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

.mainpager {
  position: relative;
}

.trigger {
  position: absolute;
  left:0;
  z-index: 100;
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.footer {
  text-align: center;
  font-size: 12px;
}
</style>
