<template>
  <div class="home">
    <span @click.stop="$router.push({name: 'dashboardIndex'})">
      dashboard_index
    </span>
    <br>
    <span @click.stop="$router.push({name: 'homeIndexOther', query: { plan: 'private' }})">
      home_other
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
