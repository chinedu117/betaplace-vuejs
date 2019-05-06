<template>
    <div> 
      <v-container grid-list-xs class="container--mobile" v-if="true">
        <v-layout row wrap>
            <v-flex xs12 md8 lg8 >
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

          <div class="pa-2 mt-3 mx-auto elevate-2" style="font-size: 20px; width: 80%; border-radius: 3px; background: #dfe1e6 " v-else >
              Sorry, we do not have the available places from your area. You can tell your friends and agents about us. Thank you (:    
          </div>

         </v-flex>
         
        </v-layout>

      </v-container>
       <mobile-footer/>
    </div>
      
      <!-- loader spinerre -->

</template>

<script>

import MobileFooter from './components/MobileFooter'
import store from './store' 
import Subscribe from '@/components/Subscribe.vue'
import LoadMore from '@/features/places_list/components/LoadMore.vue'
import PlaceListItem from './components/PlaceListItem'

export default {
  name: 'places-list',
  data () {

    return {
      //  places: this.$store.getters['places_list_store/placesFiltered'],
       
    }
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
      //remove the searach box and the filters
      this.$store.dispatch('common/updateToolBar',{show: true, component: ''})
      next()
  },
  components: { Subscribe, LoadMore, MobileFooter, PlaceListItem},
 
  created(){
        // console.log(this.$http)
        this.$store.dispatch('common/updateLoader',true)
        this.$store.dispatch('places_list_store/retrievePlaces')
        .catch(error => {
            if(error.response){
              this.$store.dispatch('common/updateSnackBar',{
              show: true,
              msg: error.response.data,
              color: 'red'
              })

              }else if(error.request){
                this.$store.dispatch('common/updateSnackBar',{
                show: true,
                msg: 'Network error: Check your connection',
                
                })
                
            }else{
              // console.log(error)
            }
        })
        .finally(() => {

          this.$store.dispatch('common/updateLoader',false)
        })
      // console.log(navigator.geolocation)
    },


  computed: {
    card_style(){
         

    },
    places:{
        get(){
            return this.$store.getters['places_list_store/placesFiltered']

        },
        set(val){}

    },
    
  }, 
}
</script>

<style lang="stylus">

@media screen and (max-width: 1080px)
  .container--mobile
    width="100%"
    padding: 0px 0px !important
</style>
