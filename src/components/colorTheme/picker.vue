<template>
  <div>
    <sketch-picker
      v-model="colors"
      style="width:300px;margin: 0 auto"
      @input="updateValue" />
  </div>
</template>

<script>
import { Sketch } from 'vue-color'

export default {
  name: 'ColorPicker',
  components: {
    'sketch-picker': Sketch
  },
  props: {
    color: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      colors: ''
    }
  },
  created () {
    this.colors = this.color
  },
  methods: {
    updateValue () {
      this.colors.name = this.name
      this.$emit('getColors', this.colors)
    }
  }
}
</script>
