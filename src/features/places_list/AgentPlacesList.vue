<template>
    <div>
      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        <v-flex  xs12>
        <!-- template for mobile phones -->
              <agent-info
                 :agent_slug="$route.params.agentSlug"
                 />
        <div class="d-flex justify-space-between">
                    <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
          <v-list two-line subheader class="pt-2" v-if="places.length > 0">
                  
                 
                 
                <template 
                  v-for="(place,index) in places"
                  
                  >
                  <div 
                  :index="index"
                  :key="Math.random() + '_' + place.slug"
                  >
                  <!-- <v-subheader >{{ place.category }}</v-subheader> -->
                  <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
                  <v-list-tile ripple avatar  @click="visitPlace(place.slug)">
                    <v-list-tile-avatar>
                      <v-avatar color="blue-grey lighten-5">
                        <span class="red--text headline">A</span>
                      </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title><div class="subheading font-weight-bold">{{ place.category.name }}</div></v-list-tile-title>
                      <v-list-tile-sub-title>
                        <div class="text--grey lighten-4 subheading text-capitalize">
                          <v-icon size="18px" class="pr-2 lighten-4" >place</v-icon>
                          <span class="text-capitalize">{{ place.location }}, {{ place.state }}</span>
                        </div>
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <span v-if="place.prefered" class="grey--text font-weight-medium" >Similar</span>
                      <!-- <v-chip v-if="place.distance">{{ place.distance }} </v-chip> -->
                      <v-chip small><span class="red--text font-weight-medium" > {{place.price | currency}}</span></v-chip>
                    </v-list-tile-action>
                   
                  </v-list-tile>
                   <v-divider inset></v-divider>
                  </div>
                </template>
                
                <!-- <load-more/> -->
              </v-list>
              
            
              <div v-else class="pa-2 ma-3 text-xs-center subheading font-weigh-bold text--grey">
                Nothing to display
                </div>
          </v-flex> <!-- End template for mobile display -->
   
      </v-layout>
      
     
      <v-container grid-list-xs  v-if="$vuetify.breakpoint.mdAndUp">
        <v-layout row wrap>
            <v-flex md8 lg8 >
                <agent-info
                 :agent_slug="$route.params.agentSlug"
                 />
              <div class="d-flex justify-space-between">
                    <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
          <div
           v-if="places.length > 0"
          > 
           
           <v-card
            class="mb-2"
            v-for="(place, index) in places"
             
             :index = "index"
             :key="Math.random() + '_' + place.slug"

            >
             
             <v-card-title class="text-md-left mb-0 pb-0">
               <div style="width:100%">
                 <div v-if="place.prefered">
                   <span  class="grey--text font-weight-medium" >By Your Preference</span><br>
                 </div>
                 
                 <v-layout  row wrap>
                     <v-flex md9>
                     <span class="headline">{{place.category.name}}</span>
                   </v-flex>
                   <v-flex md3>
                     <span  class="text-md-right red--text font-weight-medium" > {{place.price | currency}}</span>
                   </v-flex>
                 </v-layout>
                 

 
                 <div class="text--grey lighten-4 subheading text-capitalize">
                  <v-icon class="pr-2 lighten-4" >place</v-icon>
                  <span class="text-capitalize">{{ place.location }}, {{ place.state }}</span><br>
                  
                </div>
               </div>
             </v-card-title>


             <v-card-text class="text-xs-left">

                <span class=" wrap">{{ place.description }}</span><br>
                
             </v-card-text>
              
             <v-card-actions>
               <v-layout  row wrap justify-space-between>
                     <v-flex md6>
                      <v-btn flat color="accent" @click="visitPlace(place.slug)">Let's See</v-btn>
                   </v-flex>
                   <v-flex md6>
                     <span class="grey--text font-weight-medium" v-show="hasUserCoords" v-if="place.distance">{{place.distance}} Km from your location</span>
                   </v-flex>
                 </v-layout>
              
               
               
             </v-card-actions>
           </v-card>
            <!-- <load-more/> -->
         </div> <!-- large screen display wrapper -->
        <div v-else class="pa-2 ma-3 text-xs-center subheading font-weigh-bold text--grey">
                Nothing to display
                </div>

         </v-flex>
         

          <v-flex md12 lg4 xs12>
                <subscribe/>
                
         </v-flex>

      

        </v-layout>

      </v-container>
    </div>
      
      <!-- loader spinerre -->

</template>

<script>


import store from './store' 
import Subscribe from '@/components/Subscribe.vue'
// import LoadMore from '@/features/places_list/components/LoadMore.vue'
import AgentInfo from '@/features/places_list/components/AgentInfo.vue'


export default {
  name: 'agent-places-list',
  data () {

    return {
      //  places: this.$store.getters['places_list_store/placesFiltered'],
       
    }
  },
 
  components: { Subscribe,  AgentInfo},
 
  created(){
        // console.log(this.$http)
        this.$store.dispatch('common/updateLoader',true)
        this.$store.dispatch('places_list_store/retrieveAgentPlaces',this.$route.params.agentSlug)
        .finally(() => {

          this.$store.dispatch('common/updateLoader',false)
        })
      // console.log(navigator.geolocation)
    },


  computed: {
    
    places:{
        get(){
            return this.$store.getters['places_list_store/placesFiltered']

        },
        set(val){}

    },
    hasUserCoords(){

           return this.$store.getters['places_list_store/hasUserCoords']
        }
     
  },
 
 methods: {

   visitPlace(placeSlug)
   {
      this.$router.push({name: 'PlaceView', params:{id: placeSlug}})
   },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
