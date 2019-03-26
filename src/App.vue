<template>
 
  <component :is="component">
    <slot></slot>
  </component>
 
</template>

<script>
// import PublicLayout from '@/layout/public/main.vue'
import DefaultLayout from '@/layout/default/main.vue'
import DashboardLayout from '@/layout/dashboard/main.vue'

export default {
  name: 'App',

  components: {
    // PublicLayout,
    DefaultLayout,
    DashboardLayout
  },

  computed: {
    component () {
      return  this.$store.state.common.layout
    }
  },

  mounted () {
    // Update page title.
    this.$store.watch((state) => {
      return state.common.title
    }, (title) => {
      document.title = title
      //console.log('title updated')
    }, {
      deep: true
    })//watch end
  }
}
</script>
