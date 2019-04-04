<template>
  <div class="PageHeader">
    <a-layout-header class="Header">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="$emit('trigger', !collapsed)" />

      <div class="right">
        <a-dropdown>
          <div class="pointer">
            <a-avatar icon="user" />
            <span class="username">
              {{ userInfo.username }}
            </span>
          </div>
          <a-menu slot="overlay">
            <a-menu-item @click.native="logout">
              <span>{{ $t('common.exit') }}</span>
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
    </a-layout-header>
    <breadcrumb />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from './Breadcrumb'

export default {
  name: 'PageHeader',
  components: { Breadcrumb },
  props: {
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      defalutValue: '中文'
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
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    },
    handleChange (item) {
      const Transform = new CustomEvent('selectLanguage', { 'detail': item })
      window.dispatchEvent(Transform)
    }
  }
}
</script>

<style scoped>
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

.PageHeader .pointer {
  cursor: pointer;
  float: left;
}

.PageHeader .Header {
  position: relative;
  background: #fff;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
