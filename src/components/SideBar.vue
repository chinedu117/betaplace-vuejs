  <!-- the Navigation drawer showing the links -->
  <template>
        <!-- the Navigation drawer showing the links -->
    <v-navigation-drawer  v-model="active" app >
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

            <v-list-tile avatar :to="{ name: 'Places'}">
                <v-list-tile-avatar>
                    <v-icon>place</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Places</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar :to="{ name: 'PlaceView',params:{id:1}}">
                <v-list-tile-avatar>
                    <v-icon>place</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Places</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
 
        
    </v-navigation-drawer>
    </template>

    <script>
    export default {
      
      name: 'sidebar',
      data() {
        return {
          
        }
      },

      created()
      {
          this.$store.dispatch('common/updateSidebar',{visible: this.$vuetify.breakpoint.lgAndUp})
      },

    //   props: {
    //     active:{
    //        required: true,
    //        type: Boolean,
    //        default: false //this.$vuetify.breakpoint.lgAndUp
    //     }
    //   },

      computed:{
        loggedIn() {
		      return	this.$store.getters["auth/loggedIn"]
			
        },
        active:{
            get()
            {
                return this.$store.state.common.sidebar.visible
            },

            set(val)
            {
                this.$store.dispatch('common/updateSidebar',{visible: val})
            }
        }
      },
     
      methods: {

        toggleNav() {
            if(this.active){

                this.$store.dispatch('common/updateSidebar',{visible: false})
                
            }else{
                 
                 this.$store.dispatch('common/updateSidebar',{visible: true})
            }

            console.log('Toggle')
        }
    }
    }
    </script>
    <style>
    
    </style>
    