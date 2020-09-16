<template>
  <div class="PageHeader">
    <a-layout-header class="Header">
      <div class="right">
        <a-dropdown class="userComponent">
          <div class="pointer">
            <a-avatar icon="user" />
            <span class="username">
              {{ userInfo.username }}
            </span>
          </div>
          <a-menu slot="overlay">
            <a-menu-item @click.native="logout">
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-select
          :default-value="defalutValue"
          style="width: 80px;marginRight:20px"
          @change="handleChange">
          <a-select-option
            v-for="(item,index) in languages"
            :key="index"
            :value="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
      <span
        v-if="isShowTheme"
        class="right , changeStyle"
        @click="showModal">更换主题</span>
    </a-layout-header>

    <div v-if="isShowTheme">
      <a-modal
        v-model="visible"
        :width="500"
        title="主题修改"
        :footer="null"
        :body-style="{margin: ' 0 auto'}">
        <color-theme :data-form="$store.state.theme.isReset ? initTheme : dataForm" />
        <div style="width:320px;margin: 0 auto">
          <a-button
            style="margin-right:15px"
            type="primary"
            @click="resetTheme">
            重置主题
          </a-button>
          <a-button
            style="margin-right:15px"
            @click="exportLess">
            修改配置文件
          </a-button>
          <a-button @click="ok">
            确定
          </a-button>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import colorTheme from '@/components/colorTheme/index'

export default {
  name: 'PageHeader',
  components: {
    colorTheme
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      visible: false,
      colors: {},
      dataForm: [
        { name: '@primary-color', color: '#1890ff' },
        { name: '@link-color', color: '#1890ff' },
        { name: '@secondary-color', color: '#0000ff' },
        { name: '@text-color', color: '#333' },
        { name: '@text-color-secondary', color: '#333' },
        { name: '@heading-color', color: '#333333' },
        { name: '@layout-header-background', color: '#001529' },
        { name: '@btn-primary-bg', color: '#397dcc' }
      ],
      defalutValue: '中文',
      isShowTheme: process.env.VUE_APP_MODE === 'development'
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    }),
    languages () {
      return [
        { name: this.$t('common.chinese'), value: 'cn' },
        { name: this.$t('common.english'), value: 'en' }
      ]
    }
  },
  created () {
    if (this.isShowTheme) {
      this.style = this.arrayToObj(this.dataForm)
      let vars = {}
      vars = Object.assign({}, this.style, JSON.parse(localStorage.getItem('app-theme')))
      window.less.modifyVars(vars)
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    },

    showModal () {
      this.visible = true
    },
    async resetTheme () {
      const initTheme = [
        { name: '@primary-color', color: '#1890ff' },
        { name: '@link-color', color: '#1890ff' },
        { name: '@secondary-color', color: '#0000ff' },
        { name: '@text-color', color: '#333' },
        { name: '@text-color-secondary', color: '#333' },
        { name: '@heading-color', color: '#333333' },
        { name: '@layout-header-background', color: '#001529' },
        { name: '@btn-primary-bg', color: '#397dcc' }
      ]
      this.initTheme = initTheme
      this.$store.commit('theme/updateIsReset', true)
      localStorage.setItem('app-theme', '{}')
      let vars = {}
      vars = this.arrayToObj(initTheme)
      window.less.modifyVars(vars)
      this.visible = false
      await this.$api.exportLess.set(initTheme)
      this.$message.success('重置主题成功')
    },
    ok () {
      this.visible = false
    },
    getColor (res) {
      this.colors = res
    },
    arrayToObj (arr) {
      const obj = {}
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i].name] = arr[i].color
      }
      return obj
    },
    async exportLess () {
      await this.$api.exportLess.set(this.dataForm)
      this.$message.success('success')
    },
    showSmall () {
      this.$store.commit('menu/updateSmall', true)
    },
    handleChange (item) {
      const Transform = new CustomEvent('selectLanguage', { detail: item })
      window.dispatchEvent(Transform)
    }
  }
}
</script>

<style scoped>
.PageHeader {
  height: 60px;
}

.PageHeader .right {
  float: right;
  margin: 0 16px;
}

.PageHeader .username {
  float: right;
  max-width: 10em;
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.userComponent {
  float: right;
}

.PageHeader .pointer {
  cursor: pointer;
}

.PageHeader .Header {
  position: relative;
  background: #fff;
  padding: 0;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.trigger:hover {
  color: #1890ff;
}

.changeStyle {
  cursor: pointer;
}

</style>
