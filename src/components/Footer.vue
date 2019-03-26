<template>
  <v-footer class="my-appfooter" dark app :class="{ 'my-appfooter--sidebar-open': sidebarVisibility }">
       <div class="grey--text">© 2019 Providing Shelter for you</div>
       <div class="grey--text">with love stranded NYSC corper</div>
     </v-footer>   
</template>

<script>
export default {
  name:'footer',
  data(){
     return {

     }
  },
  computed: {
    sidebarVisibility () {
      return this.$store.state.common.sidebar.visible && this.$vuetify.breakpoint.mdAndUp
    }
  }
}
</script>

<style scoped>
.my-appfooter {
  justify-content: center;
}
  

.my-appfooter--sidebar-open {
  justify-content: center;
  padding-left: 300px;
}
    

</style>
