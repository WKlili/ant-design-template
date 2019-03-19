<template>
  <div class="home">
    <span @click.stop="$router.push({name: 'dashboard_index'})">
      {{ $t('pageContent.dashboard_index') }}
    </span>
    <br>
    <span @click.stop="$router.push({name: 'home_index_other', query: { plan: 'private' }})">
      {{ $t('pageContent.home_other') }}
    </span>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}

</script>

<style scoped>
.home{
  cursor: pointer;
}
</style>
