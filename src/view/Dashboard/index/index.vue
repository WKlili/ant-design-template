<template>
  <div>
    <a-card :bordered="false">
      <div
        v-for="(item, index) in items"
        :key="index">
        {{ item }}
      </div>
    </a-card>

    <!-- {{ a }}
    <div>
      <a-button
        type="primary"
        @click="clearToken">
        清除token信息
      </a-button>
      <a-button
        type="primary"
        @click="logout">
        登出
      </a-button>
    </div> -->
  </div>
</template>

<script>
import { clearToken } from '../../../utils/token'

export default {
  name: 'DashboardIndex',
  data () {
    return {
      a: 1,
      items: []
    }
  },
  created () {
    this.a = 2
    for (let i = 0; i < 100; i++) {
      this.items.push(i)
    }
  },
  methods: {
    clearToken () {
      clearToken()
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style>

</style>
