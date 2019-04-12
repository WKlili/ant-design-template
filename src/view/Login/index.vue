<template>
  <div class="Login">
    <div class="container">
      <div class="content">
        <div class="top">
          <div class="header">
            <div class="title">
              <img
                class="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="">
              <span>
                {{ env.VUE_APP_NAME }} {{ env.VUE_APP_ENV }}
              </span>
            </div>
          </div>
          <div class="desc">
            <div v-if="env.VUE_APP_MODE !== 'production'">
              <br>
              <div>{{ env.VUE_APP_USER }} {{ currentTime }}</div>
            </div>
          </div>
        </div>
        <login-form />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm'
import dayjs from 'dayjs'

export default {
  name: 'Login',
  metaInfo: {
    title: '登录'
  },
  components: {
    LoginForm
  },
  data () {
    return {
      env: process.env,
      currentTime: dayjs(process.env.VUE_APP_BUILD_DATETIME).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {}
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
}

.content {
  padding: 32px 0;
  flex: 1;
}

@media (min-width: 400px) {
  .container {
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }

  .content {
    padding: 112px 0 24px 0;
  }
}

.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
}

.logo {
  height: 60px;
  width: 60px;
  vertical-align: middle;
}

.title {
  font-size: 33px;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.desc {
  margin-top: 12px;
  margin-bottom: 40px;
}
</style>
