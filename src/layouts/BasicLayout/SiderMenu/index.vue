<template>
  <div>
    <a-layout-sider
      v-if="isShowBigMenu"
      v-model="collapsed"
      class="customizeSiderMenu"
      :width="256"
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

    <a-drawer
      title=""
      placement="left"
      :closable="false"
      :visible="$store.state.menu.showsmallMenu"
      @close="onClose">
      <side-menu
        theme="light"
        :collapsed="collapsed"
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        :menu-list="menuList"
        @openChange="openChange"
        @select="select" />

      <a-icon
        v-if="$store.state.menu.showsmallMenu"
        class="icons-copy"
        :type="$store.state.menu.showsmallMenu ? 'close':'bars'"
        @click="hideSmall" />
    </a-drawer>

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
    $route () {
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
      const routeName = this.$route.meta.routeName.split('_')
      if (!this.openKeys.includes(routeName[0])) {
        this.openChange([routeName[0], ...this.openKeys])
      }

      this.selectedKeys = [routeName[1]]
    },
    select (key) {
      this.$router.push({ name: key })
    },
    openChange (routerItemsArray) {
      if (routerItemsArray.length < this.openKeys.length) {
        this.openKeys = routerItemsArray
        return
      }

      routerItemsArray.map((item, index) => {
        if (!this.openKeys.includes(item)) {
          this.openKeys.push(item)
        }
      })
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
.customizeSiderMenu {
  height: 100vh;
  z-index: 1;
  box-shadow:2px 0 6px rgba(131, 134, 138, 0.35);
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
