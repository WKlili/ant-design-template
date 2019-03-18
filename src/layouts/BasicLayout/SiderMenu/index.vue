<template>
  <a-layout-sider
    v-model="collapsed"
    class="SiderMenu"
    :trigger="null"
    collapsible>
    <div class="logo">
      <img
        src="../images/logo.png"
        alt="logo">
      <a-tooltip placement="rightTop">
        <template slot="title">
          <span>{{ VUE_APP_NAME }} {{ VUE_APP_ENV }}</span>
        </template>
        <span
          v-if="!collapsed"
          class="testOverflow">
          {{ VUE_APP_NAME }} {{ VUE_APP_ENV }}
        </span>
      </a-tooltip>
    </div>

    <a-menu
      theme="dark"
      mode="inline"
      :default-open-keys="openKeys"
      :open-keys="openKeys"
      :selected-keys="selectedKeys"
      @openChange="onOpenChange"
      @select="jump">
      <template v-for="item in menuList">
        <template v-if="!item.hidden">
          <a-menu-item
            v-if="!item.children"
            :key="item.name">
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.name }}</span>
          </a-menu-item>
          <sub-menu
            v-else
            :key="item.name"
            :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import SubMenu from './SubMenu'

export default {
  name: 'SiderMenu',
  components: { SubMenu },
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
      openKeys: [],
      rootSubmenuKeys: [],
      selectedKeys: [],
      subMenuCollapsed: true
    }
  },
  watch: {
    $route ({ name }) {
      this.updateDefaultKeys(name)
    }
  },
  created () {
    this.menuList = this.$router.options.routes
    this.rootSubmenuKeys = this.menuList.map(menu => menu.name)
  },
  mounted () {
    this.updateDefaultKeys(this.$route.name)
  },
  methods: {
    updateDefaultKeys (key, level) {
      const routerName = key.split('_')
      this.openKeys = [routerName[0]]

      if (routerName.length < 3) {
        this.selectedKeys = [key]
        return
      }

      if ((!level && routerName.length >= 3) || level < 3) {
        this.selectedKeys = [routerName.slice(0, routerName.length - 1).join('_')]
        return
      }

      if (level >= 3) {
        this.selectedKeys = [key]
        this.openKeys.push(`${routerName[0]}_${routerName[1]}`)
      }
    },
    jump ({ item, key, selectedKeys }) {
      this.updateDefaultKeys(key, item.level)
      if (this.$route.name === key) return

      this.$router.push({
        name: key
      })
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)

      if (!this.subMenuCollapsed) {
        this.openKeys = openKeys
        return
      }

      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  }
}

</script>

<style scoped>
.SiderMenu {
  height: 100vh;
}

.SiderMenu .logo {
  display: flex;
  justify-content: center;
  background-color: #002140;
  height: 64px;
  padding: 16px;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.SiderMenu .logo img {
  height: 100%;
}

.SiderMenu .logo span {
  height: 100%;
  text-indent: 10px;
}

.SiderMenu .logo span {
  font-size: 20px;
}

.testOverflow {
  width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
