<template>
  <div class="Breadcrumb">
    <a-breadcrumb>
      <template v-for="item in levelList">
        <a-breadcrumb-item
          v-if="item.meta.name"
          :key="item.path">
          <span
            class="name"
            @click.stop="jump(item)">
            {{ (item.meta.name) }}
          </span>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.update()
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.levelList = this.$route.matched.filter(item => item.name)
    },
    jump (router) {
      this.$router.push({
        name: router.name
      })
      console.log(router)
    }
  }
}
</script>

<style scoped>
.Breadcrumb {
  background: #fff;
  padding: 0 32px;
  border-bottom: 1px solid #e8e8e8;
}

.Breadcrumb .name {
  display: inline-block;
  line-height: 44px;
  cursor: pointer;
}
</style>
