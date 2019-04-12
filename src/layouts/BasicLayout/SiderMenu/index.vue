<template>
  <div>
    <a-layout-sider
      v-if="isShowBigMenu"
      v-model="collapsed"
      class="SiderMenu"
      :trigger="null"
      collapsible>
      <side-menu
        theme="dark"
        :collapsed="collapsed"
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        :menu-list="menuList"
        @openChange="openChange"
        @select="select" />
    </a-layout-sider>

    <div>
      <a-drawer
        title=""
        placement="left"
        :closable="false"
        :visible="$store.state.menu.showsmallMenu"
        @close="onClose">
        <div class="SiderMenus">
          <side-menu
            theme="light"
            :collapsed="collapsed"
            :selected-keys="selectedKeys"
            :open-keys="openKeys"
            :menu-list="menuList"
            @openChange="openChange"
            @select="select" />
        </div>

        <a-icon
          v-if="$store.state.menu.showsmallMenu"
          class="icons-copy"
          :type="$store.state.menu.showsmallMenu ? 'close':'bars'"
          @click="hideSmall" />
      </a-drawer>
    </div>

    <div
      v-if="!$store.state.menu.showBigMenu">
      <a-icon
        class="icons"
        type="bars"
        @click="showSmall" />
    </div>
  </div>
</template>

<script>
import SideMenu from './menu'
import { setTimeout } from 'timers'

export default {
  name: 'SiderMenu',
  components: { SideMenu },
  props: {
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      VUE_APP_ENV: process.env.VUE_APP_ENV,
      VUE_APP_NAME: process.env.VUE_APP_NAME,
      menuList: [],
      openKeys: [this.$route.matched[0].name],
      rootSubmenuKeys: [],
      selectedKeys: [],
      subMenuCollapsed: true,
      currentClientWidth: document.body.clientWidth,
      isShowBigMenu: true
    }
  },
  watch: {
    $route ({ name }) {
      this.openChange([name.split('_')[0]])
      this.updateDefaultKeys()
    },
    currentClientWidth (newVal, oldVal) {
      this.modifyMenu()
    }
  },
  mounted () {
    this.initProject()
  },
  methods: {
    updateDefaultKeys () {
      let routeName = this.$route.meta.routeName
      this.selectedKeys = [routeName]
    },
    select (key) {
      this.$router.push({ name: key })
    },
    openChange (menuItem) {
      this.openKeys = menuItem
    },
    initProject () {
      if (document.body.clientWidth === 0) {
        setTimeout(() => {
          this.currentClientWidth = document.body.clientWidth
          this.watchWidth()
        }, 100)
      } else {
        this.watchWidth()
      }
    },
    watchWidth () {
      this.menuList = this.$router.options.routes
      this.updateDefaultKeys()
      let timer = null
      window.onresize = () => {
        if (timer) clearTimeout(this.timmer)

        timer = setTimeout(() => {
          this.currentClientWidth = document.body.clientWidth
        }, 1000)
      }
      this.modifyMenu()
    },
    modifyMenu () {
      if (this.currentClientWidth < 768) {
        this.isShowBigMenu = false
        this.$store.commit('menu/update', false)
      } else {
        this.$store.commit('menu/updateSmall', false)
        this.isShowBigMenu = true
        this.$store.commit('menu/update', true)
      }
    },
    onClose () {
      this.$store.commit('menu/updateSmall', false)
    },
    showSmall () {
      this.$store.commit('menu/updateSmall', true)
      this.$emit('moveRight')
    },
    hideSmall () {
      this.$store.commit('menu/updateSmall', false)
      this.$emit('moveLeft')
    }
  }
}

</script>

<style scoped>
.SiderMenu {
  height: 100vh;
}

.SiderMenus .logo img {
  height: 100%;
}

.SiderMenus .logo span {
  height: 100%;
  text-indent: 10px;
}

.icons{
  position: fixed;
  top: 14px;
  left: 0px;
  width: 40px;
  height: 40px;
  padding-top: 12px;
  box-shadow: 0px 0px 10px 0 #999;
  z-index: 100;
}

.drawer {
  position: relative
}
.icons-copy{
  width: 40px;
  height: 40px;
  padding-top: 12px;
  z-index: 100;
  background: #fff;
  position: absolute;
  right: -40px;
  top:14px
}

</style>
