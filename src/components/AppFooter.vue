<template>

  <v-footer class="my-appfooter" dark  :class="{ 'my-appfooter--sidebar-open': sidebarVisibility }" >
       <ul>

          <li><a href="#">privacy policy</a></li>
          <li><a href="#">terms and conditions</a></li>
           <li><a href="#">Rules</a></li>
           <li><a href="#">Contact us</a></li>
       </ul>

          <p>copyright © 2019 betaplace.com.ng</p>
  </v-footer>   
</template>

<script>
export default {
  name:'AppFooter',
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
  text-align: center;
  background: #e7e9ef33;
  padding: 35px 20px;
  font-size: 16px;
  display: block;
  height: auto !important;

}


.my-appfooter--sidebar-open {
  justify-content: center;
  margin-left: 300px;
}

.my-appfooter > ul {
    list-style: none;
    margin: 25px auto 35px;
    padding: 0;
    color: black;
}

.my-appfooter > ul > li {
    display: inline-block;
    margin: 0 18px;
    text-transform: capitalize;
}
 
a {
   text-decoration: none;
   color: inherit;
}

@media screen and (max-width: 1080px){
   .my-appfooter > ul {

      display: none;
   }

}

</style>
