import Vue from 'vue'
import VueI18n from 'vue-i18n'
import antCn from 'ant-design-vue/lib/locale-provider/zh_CN'
import antEn from 'ant-design-vue/lib/locale-provider/en_GB'
import en from './en'
import cn from './cn'

Vue.use(VueI18n)
const languages = {
  en: Object.assign(en, antEn),
  cn: Object.assign(cn, antCn)
}

export default new VueI18n({
  locale: 'cn',
  messages: languages
})
