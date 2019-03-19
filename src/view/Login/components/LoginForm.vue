<template>
  <a-form
    id="LoginForm"
    :form="form"
    class="login-form">
    <a-form-item>
      <a-input
        v-decorator="formItemOptions.username"
        autocomplete="username"
        size="large"
        :placeholder="$t('login.userName')">
        <a-icon
          slot="prefix"
          class="icon"
          type="user" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="formItemOptions.password"
        autocomplete="current-password"
        size="large"
        type="password"
        :placeholder="$t('login.password')">
        <a-icon
          slot="prefix"
          class="icon"
          type="lock" />
      </a-input>
    </a-form-item>

    <a-form-item>
      <a-button
        :loading="loading"
        size="large"
        type="primary"
        html-type="submit"
        class="login-form-button"
        @click.stop="check">
        {{ $t('login.login') }}
      </a-button>
    </a-form-item>

    <a-form-item>
      <router-link
        :to="{ name: 'register' }"
        class="register">
        {{ $t('login.register') }}
      </router-link>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      formItemOptions: {
        username: [
          'username',
          { rules: [{
            required: true,
            message: '请输入用户名'
          }] }
        ],
        password: [
          'password',
          { rules: [{
            required: true,
            message: '请输入密码'
          }] }
        ]
      }
    }
  },
  methods: {
    touristLogin () {
      this.$store
        .dispatch('user/login', {
          username: 'tourist',
          password: 'pwd'
        })
        .then(() => {
          this.$message.success('登录成功')
          this.$router.push({ path: '/' })
        })
    },
    check () {
      this.form.validateFields(err => {
        if (!err) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.form.getFieldsValue())
            .then(() => {
              this.$message.success('登录成功')
              this.$router.push({ path: '/' })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style scoped>
#LoginForm.login-form {
  max-width: 368px;
  margin: 0 auto;
}
#LoginForm .login-form-forgot, .register {
  float: right;
}
#LoginForm .login-form-button {
  width: 100%;
}

#LoginForm .icon {
  color: rgba(0, 0, 0, .25);
}
</style>
