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
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      theme="dark"
      mode="inline"
      @openChange="openChange"
      @select="select">
      <template v-for="item in menuList">
        <template v-if="!item.hidden">
          <a-menu-item
            v-if="item.onePage"
            :key="item.children[0].name">
            <a-icon :type="item.children[0].meta.icon" />
            <span>{{ item.children[0].meta.name }}</span>
          </a-menu-item>

          <a-menu-item
            v-else-if="!item.children"
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
      openKeys: [this.$route.matched[0].name],
      rootSubmenuKeys: [],
      selectedKeys: [],
      subMenuCollapsed: true
    }
  },
  watch: {
    $route ({ name }) {
      this.openChange([name.split('_')[0]])
      this.updateDefaultKeys()
    }
  },
  created () {
    this.menuList = this.$router.options.routes
    this.updateDefaultKeys()
  },
  methods: {
    updateDefaultKeys () {
      let routeName = this.$route.meta.routeName
      routeName = routeName.indexOf('-') !== -1 ? routeName.split('-')[0] : routeName
      this.selectedKeys = [routeName]
    },
    select ({ key }) {
      this.$router.push({ name: key })
    },
    openChange (menuItem) {
      this.openKeys = menuItem
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
