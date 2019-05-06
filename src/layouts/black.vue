<template>
  <div :class="$style.blackPage">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'BlackPage'
}

</script>

<style lang='less' module>
.blackPage{}
</style>
