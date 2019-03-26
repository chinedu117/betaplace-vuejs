<template>
    <!-- the app component helps to determine the viewport -->
    <v-app>
    
    <sidebar/>

    <!-- the main toolbar of the page -->
    <tool-bar app v-if="showToolBar"/>
    
    <!-- Search Bar will show only when the search icon is clicked -->
    <search
        v-if="$store.state.places_list_store.search.show"
    />

    <!-- Filter box will display Price filters -->
    <filter-box
        v-if="$store.state.places_list_store.filter_box.show"
    />
        
    <v-content>
         <!-- the transition of the route view -->
        <transition 
	            name="router-animation"
	            enter-active-class="animated fadeIn"
	            leave-active-class="animated  fadeOut"
	            mode="out-in"
	        >
                <!-- <v-container class="wrapper" fluid> -->
             
                    <router-view></router-view>
            
                <!-- </v-container> -->

         </transition>
    </v-content>

   <!-- the snackbar or toast section for displaying errors and success messages -->
    <v-snackbar
    
	  :right="$vuetify.breakpoint.lgAndUp"
	  v-model="snackBarActive"
	  :timeout="$store.state.common.snackBar.timeout"
	  :bottom="$vuetify.breakpoint.mdAndDown"
      :top="$vuetify.breakpoint.lgAndUp"
      color="$store.state.common.snackBar.color"
      >
    
        {{ $store.state.common.snackBar.msg }}
        <v-btn
            color="$store.state.common.snackBar.color"
            flat
            @click="snackBarActive = false"
        >
            Close
        </v-btn>
	 </v-snackbar>
     <loader/>
     <install-prompt></install-prompt>
     <!-- the footer section -->
     <v-footer class="my-appfooter" dark :class="{ 'my-appfooter--sidebar-open': sidebarVisibility }">
       <div class="grey--text">© 2019 Providing Shelter for you</div>
       <!-- <div class="grey--text">with love stranded NYSC corper</div> -->
     </v-footer>
    <!-- <v-footer height="auto" dark app v-if="!$vuetify.breakpoint.smAndDown">
        
        <v-layout row wrap justify-space-between>
            <v-flex xs4>AboutUs</v-flex>
            <v-flex xs4>ContactUs</v-flex>
            <v-flex xs4>FAQS</v-flex>
        </v-layout>
    </v-footer> -->
      
    
    </v-app>
</template>
<script>
import InstallPrompt from '@/components/InstallPrompt'
import Footer from '@/components/Footer.vue'
import Loader from '@/components/Loader'
import ToolBar from '@/components/ToolBar.vue'
import sidebar from '@/components/SideBar.vue'
import search from '@/features/places_list/components/Search.vue'
import FilterBox from '@/features/places_list/components/FilterBox.vue'

export default {

    data() {
        return {
  

            
        }
    },

    components:{ InstallPrompt, Footer, FilterBox, Loader, sidebar, search, ToolBar},
  
    computed: {
    //   loggedIn() {
	// 	return	this.$store.getters["auth/loggedIn"]
			
    //     },
        sidebarVisibility () {
          return this.$store.state.common.sidebar.visible && this.$vuetify.breakpoint.mdAndUp
       },
        showToolBar()
        {   
            return this.$store.state.common.toolBar.show
           
        },

        snackBarActive: {

             get () {
                 return this.$store.state.common.snackBar.show
            },

            set (val) {
                this.$store.dispatch('common/updateSnackBar',{ show : val})
            }

           
        }
    },

    
}
</script>

<style>
.my-appfooter {
  justify-content: center;
}
  

.my-appfooter--sidebar-open {
  justify-content: center;
  padding-left: 300px;
}

 .footer-item {
     list-style: none;
     display: inline-block;
     
 }

 .wrapper{

	  animation-duration: 0.2s;
     
  }

 

</style>
