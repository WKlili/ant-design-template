<template>
  <div class="allWrap">
    <section
      v-for="(item, index) in dataForm"
      :key="index"
      class="wrap">
      <span>{{ item.name }}</span>
      <a-dropdown>
        <div class="color">
          <span
            :style="{'background': item.color, width: '12px',
                     height: '12px',
                     display: 'block'}" />
        </div>
        <a-menu slot="overlay">
          <photo-shop
            :color="item.color"
            :name="item.name"
            @getColors="getColor" />
        </a-menu>
      </a-dropdown>
    </section>
  </div>
</template>

<script>
import PhotoShop from '@/components/colorPicker'

export default {
  components: {
    PhotoShop
  },
  props: {
    dataForm: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      colors: '',
      style: {}
    }
  },
  methods: {
    getColor (res) {
      this.colors = res.hex
      this.dataForm.map(item => {
        if (item.name === res.name) item.color = res.hex
      })
      this.style = this.arrayToObj(this.dataForm)
      localStorage.setItem('app-theme', JSON.stringify(this.style))
      window.less.modifyVars(this.style)
    },
    arrayToObj (arr) {
      let obj = {}
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i].name] = arr[i].color
      }
      return obj
    }
  }
}
</script>

<style scoped>
  .allWrap{
    display: flex;
    flex-direction: column
  }
  .wrap{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px
  }

  .color{
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 2px;
    cursor: pointer;
  }

  .colors{

  }

</style>
