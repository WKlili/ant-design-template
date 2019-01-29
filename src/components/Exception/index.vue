<template>
  <div class="Exception">
    <a-card :bordered="false">
      <div class="title">
        <a-icon
          class="icon"
          type="exclamation-circle" />
        <h1>{{ pageType }}</h1>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Exception',
  props: {
    pageType: {
      type: String,
      default: '404'
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.Exception {}

.title {
  text-align: center;
}

.icon {
  color: #f5222d;
  font-size: 84px;
  margin: 20px;
}
</style>
