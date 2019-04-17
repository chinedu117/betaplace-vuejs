<template>
    <div> 
      
      <v-container grid-list-xs class="container--mobile" v-if="true">

        <v-layout row wrap>
            <v-flex xs12 md8 lg8 >

             <agent-info
                 :agent_slug="$route.params.agentSlug"
                 :show_body="false"
                 />

              <div
               v-if="places.length > 0"
               class="mx-auto"
              > 

               <div class="d-flex justify-space-between">
                  <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
               </div>

                <place-list-item
                 v-for="(place, index) in places"
                 :index = "index"
                 :key="Math.random() + '_' + place.slug"
                 :place="place"
                />
        
                <load-more/>
         </div>

         </v-flex>
         
        </v-layout>

      </v-container>
       <mobile-footer/>
    </div>
      
      <!-- loader spinerre -->

</template>
<script>


import store from './store' 
import Subscribe from '@/components/Subscribe.vue'
// import LoadMore from '@/features/places_list/components/LoadMore.vue'
import AgentInfo from '@/features/places_list/components/AgentInfo.vue'
import PlaceListItem from './components/PlaceListItem'


export default {
  name: 'agent-places-list',
  data () {

    return {
      //  places: this.$store.getters['places_list_store/placesFiltered'],
       
    }
  },
 
  components: { Subscribe,  AgentInfo, PlaceListItem },
 
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
