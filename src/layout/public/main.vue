<template>
    <!-- the app component helps to determine the viewport -->
    <v-app>
        <!-- the Navigation drawer showing the links -->
    <v-navigation-drawer  v-model="navActive" app>
        <v-toolbar flat dark color="accent">

            <v-btn flat icon large @click.stop="toggleNav()">
                <v-icon>chevron_left</v-icon>
            </v-btn>    
            
        </v-toolbar>
        
        <v-divider></v-divider>
        <v-list class="pt-4">
            <v-list-tile avatar :to="{ name: 'Home'}">
                <v-list-tile-avatar>
                    <v-icon>home</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile avatar :to="{ name: 'Todo'}">
                <v-list-tile-avatar>
                    <v-icon>settings</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>App</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile v-if="!loggedIn" avatar :to="{ name: 'Login'}">
                <v-list-tile-avatar>
                    <v-icon>account_box</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Login</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="loggedIn" avatar :to="{ name: 'Logout'}">
                <v-list-tile-avatar>
                    <v-icon>logout</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="!loggedIn" avatar :to="{ name: 'Register'}">
                <v-list-tile-avatar>
                    <v-icon>account_box</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Register</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
 
        
    </v-navigation-drawer>
    <!-- the main toolbar of the page -->
    <v-toolbar flat fixed dark color="accent" app>
        <v-toolbar-side-icon @click.stop="toggleNav()"></v-toolbar-side-icon> 
        <v-toolbar-title>{{ $store.state.common.title }}</v-toolbar-title> 
    </v-toolbar>

    <v-content app>
         <!-- the transition of the route view -->
        <transition 
	            name="router-animation"
	            enter-active-class="animated fadeIn"
	            leave-active-class="animated  fadeOut"
	            mode="out-in"
	        >
                <v-container class="wrapper landing-page" fluid>
             
                    <router-view></router-view>
            
                </v-container>

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
     <!-- the footer section -->
    <v-footer height="auto" dark app>
        <v-container grid-list-xs justify-center>
            <v-layout row wrap>
                <v-flex xs4>AboutUs</v-flex>
                <v-flex xs4>ContactUs</v-flex>
                <v-flex xs4>FAQS</v-flex>
            </v-layout>
        </v-container>
        
    </v-footer>
      
    
    </v-app>
</template>
<script>
import Loader from '@/components/Loader'
export default {

    data() {
        return {
            navActive: false,
        
        }
    },
    components: { Loader },
    computed: {
      loggedIn() {
		return	this.$store.getters["auth/loggedIn"]
			
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
    methods: {

        toggleNav() {
            if(this.navActive){
                this.navActive = false
            }else{
                 this.navActive = true
            }

            console.log('Toggle')
        }
    }
    
}
</script>

<style>
 .footer-item {
     list-style: none;
     display: inline-block;
     
 }

 .wrapper{

	  animation-duration: 0.2s;
     
  }
  .landing-page {
      
      background-image: url(./../../assets/img/landing_bg.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-weight: 400;
      font-size: 4rem;
      color: rgb(255, 255, 255);
      
}

</style>
