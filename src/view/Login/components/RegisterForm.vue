<template>
  <div class="dp-register main user-layout-register">
    <a-form
      id="formRegister"
      ref="formRegister"
      :form="form">
      <a-form-item>
        <a-input
          v-decorator="formItemOptions.username"
          size="large"
          :autocomplete="false"
          placeholder="用户名">
          <a-icon
            slot="prefix"
            class="icon"
            type="user" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="formItemOptions.nickname"
          :autocomplete="false"
          size="large"
          placeholder="昵称">
          <a-icon
            slot="prefix"
            class="icon"
            type="idcard" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button-group
          v-decorator="formItemOptions.gender"
          class="dp-gender"
          size="large"
          :autocomplete="false">
          <a-button
            :type="gender.ifman ? 'primary':'default'"
            icon="man"
            @click.stop.prevent="setGender('man')">
            Male
          </a-button>
          <a-button
            :type="gender.ifwoman ? 'primary':'default'"
            icon="woman"
            @click.stop.prevent="setGender('woman')">
            Female
          </a-button>
        </a-button-group>
      </a-form-item>

      <a-popover
        :visible="state.passwordLevelChecked"
        placement="right"
        trigger="click">
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：<span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :show-info="false"
              :stroke-color=" passwordLevelColor " />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input
            v-decorator="formItemOptions.password"
            size="large"
            type="password"
            :autocomplete="false"
            placeholder="至少6位密码，区分大小写"
            @click="handlePasswordInputClick"
            @input="clearpassword2">
            <a-icon
              slot="prefix"
              class="icon"
              type="lock" />
          </a-input>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input
          v-decorator="formItemOptions.mobile"
          size="large"
          placeholder="11 位手机号"
          autocomplete="false">
          <a-icon
            slot="prefix"
            class="icon"
            type="mobile" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="registerBtn"
          :disabled="registerBtn"
          size="large"
          type="primary"
          class="register-button"
          @click.stop.prevent="handleSubmit">
          注册
        </a-button>
        <router-link
          :to="{ name: 'login' }"
          class="login">
          使用已有账户登录
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

export default {
  name: 'Register',
  data () {
    return {
      form: this.$form.createForm(this),
      formItemOptions: {
        username: ['username', {
          initialValue: '',
          rules: [{
            required: true,
            message: '请输入用户名'
          }]
        }],
        nickname: ['nickname', {
          initialValue: '',
          rules: [{
            required: true,
            message: '请输入昵称'
          }]
        }],
        gender: ['gender', {
          initialValue: '',
          rules: [{
            required: true,
            message: '请选择性别'
          }]
        }],
        password: ['password', {
          initialValue: '',
          rules: [{
            required: true,
            message: '至少6位密码，区分大小写'
          },
          {
            validator: this.handlePasswordLevel
          }]
        }],
        mobile: ['mobile', {
          initialValue: '',
          rules: [{
            required: true,
            message: '请输入手机号'
          },
          {
            max: 11,
            message: '手机号位数不能超过11位'
          },
          {
            validator: this.mobileCheck
          }],
          validateTrigger: 'blur'
        }]
      },
      clearpassword: null,
      gender: {
        ifman: false,
        ifwoman: false
      },
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    setGender (newGender) {
      const { form, gender } = this

      gender.ifman = newGender === 'man'
      gender.ifwoman = !gender.ifman

      form.setFieldsValue({ gender: newGender })
    },
    handlePasswordLevel (rule, value, callback) {
      let level = 0
      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordInputClick () {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    clearpassword2 () {
      if (!this.clearpassword === false) {
        clearTimeout(this.clearpassword)
      }

      this.clearpassword = setTimeout(() => {
        this.form.setFieldsValue({ password2: '' })
      }, 200)
    },

    mobileCheck (rule, value, callback) {
      const mobile = this.form.getFieldValue('mobile')
      if (!/^[1][0-9]{10}$/.test(mobile)) {
        callback(new Error('请输入有效的手机号码'))
      }
      callback()
    },

    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('register', values)
        }
      })
    },

    requestFailed (err) {
      this.$notification.error({
        message: '错误',
        description:
          ((err.response || {}).data || {}).message ||
          '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  }
}
</script>

<style scoped>
.dp-register {
  max-width: 368px;
  margin: 0 auto;
}
#LoginForm.login-form {
  max-width: 368px;
  margin: 0 auto;
}

#LoginForm .login-form-forgot {
  float: right;
}

#LoginForm .icon {
  color: rgba(0, 0, 0, 0.25);
}

.user-register .error {
  color: #ff0000;
}

.user-register .warning {
  color: #ff7e05;
}

.user-register .success {
  color: #52c41a;
}

h3 {
  font-size: 16px;
  margin-bottom: 20px;
}

.getCaptcha {
  display: block;
  width: 100%;
  height: 40px;
}

.register-button {
  width: 50%;
}

.login {
  float: right;
  line-height: 40px;
}

.dp-gender {
  width: 100%;
}

.dp-gender .ant-btn {
  width: 50%;
}
</style>
