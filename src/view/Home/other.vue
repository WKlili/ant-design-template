<template>
  <div class="other">
    <span @click.stop="$router.push({name: 'home_index_last', query: { plan2: 'private1111' }})">
      to last
    </span>
  </div>
</template>

<script>
export default {
  name: 'Other',
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
.other{}
</style>
