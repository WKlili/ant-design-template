<template>
  <div class="SiderMenu">
    <div
      class="logo"
      :style="{background: theme === 'dark' ? '#002140' : '#fff'}">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        alt="logo">
      <a-tooltip placement="rightTop">
        <template slot="title">
          <span :style="{color: theme === 'dark' ? '#fff' : '#333'}">{{ VUE_APP_NAME }} {{ VUE_APP_ENV }}</span>
        </template>
        <span
          v-if="!collapsed"
          :style="{color: theme === 'dark' ? '#fff' : '#333'}"
          class="testOverflow">
          {{ VUE_APP_NAME }} {{ VUE_APP_ENV }}
        </span>
      </a-tooltip>
    </div>

    <a-menu
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      :theme="theme"
      mode="inline"
      @openChange="openChange"
      @select="select">
      <template v-for="item in menuList">
        <template v-if="!item.hidden">
          <a-menu-item
            v-if="item.onePage"
            :key="item.children[0].name">
            <a-icon :type="item.children[0].meta.icon" />
            <span>{{ $t(item.children[0].meta.name) }}</span>
          </a-menu-item>

          <a-menu-item
            v-else-if="!item.children"
            :key="item.name">
            <a-icon :type="item.meta.icon" />
            <span>{{ $t(item.meta.name) }}</span>
          </a-menu-item>
          <sub-menu
            v-else
            :key="item.name"
            :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu'

export default {
  components: { SubMenu },
  props: {
    theme: {
      type: String,
      default: ''
    },
    selectedKeys: {
      type: Array,
      default: () => []
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    menuList: {
      type: Array,
      default: () => []
    },
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      VUE_APP_ENV: process.env.VUE_APP_ENV,
      VUE_APP_NAME: process.env.VUE_APP_NAME
    }
  },
  created () {
    // console.log(this.collapsed)
  },
  methods: {
    openChange (menuItem) {
      this.$emit('openChange', menuItem)
    },
    select (data) {
      this.$emit('select', data.key)
    }
  }
}
</script>

<style scoped>
.SiderMenu .logo, .SiderMenus .logo{
  display: flex;
  justify-content: center;
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
