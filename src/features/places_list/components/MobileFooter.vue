<template>
   <div>

    <div class="agent-prompt elevate-3">
           <div class="tool-icon">
                 <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                  <v-icon v-on="on" v-bind="iconProps"  @click="displaySearchBox">search</v-icon>
                   
                 </template>
                  <span>Search by Location</span>
                </v-tooltip>
                <!-- <v-icon size="30px" >search</v-icon><br>
                 <span class="grey--text text-capitalize text-xs-center">Search</span> -->
            </div>


           <div class="tool-icon tool-icon-prominent">
            <v-icon size="24px" color="white">my_location</v-icon><br>
            </div>
            <div class="tool-icon">

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                  <v-icon v-on="on"  v-bind="iconProps" @click="displayFilterBox">filter_list</v-icon>
                 
                 </template>
                  <span>Filter by your priorities </span>
                </v-tooltip>
            <!-- <v-icon size="30px"  >filter_list</v-icon><br>
             <span class="grey--text text-capitalize text-xs-center">Filter</span> -->
            </div>
      </div>


    <div>
    <near-me  v-bind="iconProps"></near-me>
    </div>
    
    <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
      <v-icon v-on="on" v-bind="iconProps"  @click="displaySearchBox">search</v-icon>
       
     </template>
      <span>Search by Location</span>
    </v-tooltip>
    </div>

    <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
      <v-icon v-on="on"  v-bind="iconProps" @click="displayFilterBox">filter_list</v-icon>
     
     </template>
      <span>Filter by your priorities </span>
    </v-tooltip>
     </div>
   </div>


</template>

<script>
import NearMe from './NearMe.vue'
export default {
    name: 'tool-bar-items',
    components:{NearMe},
    computed: {
        iconProps(){

         if(this.$vuetify.breakpoint.mdAndUp){
              return {
                "class": "pr-2 mr-4",
                 "size": "40"

              }
            }else{
               return {
                "class": "pr-2 mr-1",
                 "size": "24"

             }
            }
            
        }
    },
    methods:{
        displaySearchBox()
        {  
            //  console.log(this.$vuetify.goTo)
            //hide toolBar
            //show searchBox
            //scrol up
            //hide the sidebar
            if(this.$store.state.common.sidebar.visible){

                this.$store.dispatch('common/updateSidebar',{visible: false})
                
            }
            this.$store.commit('common/updateToolBar',{show: false})
            this.$store.commit('places_list_store/updateSearchBox',{show: true})
            this.$vuetify.goTo(0,this.scrollOptions)
        },

        displayFilterBox(){
             
            //  this.showFilters = true
            //  this.$vuetify.goTo(0,this.scrollOptions)
            this.$store.commit('common/updateToolBar',{show: false})
            this.$store.commit('places_list_store/updateFilterBox',{show: true})
            this.$vuetify.goTo(0,this.scrollOptions)
        },
    }
}
</script>

<style lang="stylus">
.agent-prompt
  display:none
@media screen and (max-width: 1080px)
  .toolbox
    width: 100%
  
  .agent-prompt
    display: grid
    grid-template-columns: repeat(3,33.3%)
    background-color: #fff;
    height: auto
    padding: 10px 5px
    position: fixed
    bottom: 0px
    width: 100%
    z-index: 100000
    border-top: 2px solid #3f51b5
    box-shadow: 0px -1.2px 6px rgba(0, 0, 0, 0.2)

  .tool-icon
    background-color: none
    margin: 0px auto;
  .tool-icon-prominent
    width: 50px
    height: 50px
    border-radius:50%
    background-color: #414190;
    color: white;
    margin: 0px auto;
    padding: 12.5px;
</style>
