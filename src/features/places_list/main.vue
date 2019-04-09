<template>
    <div> 
      <v-container grid-list-xs class="container--mobile" v-if="true">
        <v-layout row wrap>
            <v-flex xs12 md8 lg8 >
        <div
         v-if="places.length > 0"
        > 
           <div class="d-flex justify-space-between">
                    <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
           <div
             class="list-card"
             v-for="(place, index) in places"
             :index = "index"
             :key="Math.random() + '_' + place.slug"
             @click="visitPlace(place.slug)"
            >
             
             <v-card-title class="text-md-left mb-0 pb-0">
               <div style="width:100%">
                
                <v-layout  row wrap v-if="place.prefered || place.distance ">
                  <v-flex xs8>
                     <div  v-if="place.prefered">
                       <span  class="grey--text font-weight-medium text-xs-left" >By Your Preference</span><br>
                     </div>
                   </v-flex>
                  <v-flex xs4>
                     <div class="grey--text font-weight-medium text-xs-right" v-show="hasUserCoords" v-if="place.distance"><b>{{place.distance | distance }}</b>
                     </div>
                  </v-flex>
                </v-layout>

                 <v-layout  row wrap>
                     <v-flex md9>
                     <span class="title headline--mobile">{{place.category.name}}</span>
                   </v-flex>
                   <v-flex md3 class="text-xs-right red--text font-weight-medium">
                     <div  class="text-xs-right red--text font-weight-medium" > {{place.price | currency}}</div>
                   </v-flex>
                 </v-layout>
                 

 
                 <div class="text--grey lighten-4 subheading text-capitalize">
                  <v-icon class="pr-2 lighten-4" >place</v-icon>
                  <span class="text-capitalize">{{ place.location }}, {{ place.state }}</span><br>
                  
                </div>
               </div>
             </v-card-title>


             <v-card-text class="text-xs-left" style="display: none">

                <span class=" wrap">{{ place.description }}</span><br>
                
             </v-card-text>
              
             <v-card-actions style="display: none">
               <v-layout  row wrap justify-space-between>
                     <v-flex md6>
                      <v-btn flat color="accent" @click="visitPlace(place.slug)">Let's See</v-btn>
                   </v-flex>
                   <v-flex md6>
                     <span class="grey--text font-weight-medium" v-show="hasUserCoords" v-if="place.distance"> approx <b>{{place.distance | distance }}</b> from your location</span>
                   </v-flex>
                 </v-layout>
              
               
               
             </v-card-actions>
           </div>
            <load-more/>
         </div>

         </v-flex>
         
<!-- 
          <v-flex md4 lg4>
                <subscribe/>
                
         </v-flex> -->

      

        </v-layout>

      </v-container>

       <!-- <div class="agent-prompt elevate-3">
           <div class="tool-icon">
            <v-icon size="30px" >search</v-icon><br>
             <span class="grey--text text-capitalize text-xs-center">Search</span>
            </div>
           <div class="tool-icon tool-icon-prominent">
            <v-icon size="24px" color="white">my_location</v-icon><br>
            </div>
            <div class="tool-icon">
            <v-icon size="30px"  >filter_list</v-icon><br>
             <span class="grey--text text-capitalize text-xs-center">Filter</span>
            </div>
      </div> -->
       <mobile-footer/>
    </div>
      
      <!-- loader spinerre -->

</template>

<script>

import MobileFooter from './components/MobileFooter'
import store from './store' 
import Subscribe from '@/components/Subscribe.vue'
import LoadMore from '@/features/places_list/components/LoadMore.vue'

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
  components: { Subscribe, LoadMore, MobileFooter},
 
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
    hasUserCoords(){

           return this.$store.getters['places_list_store/hasUserCoords']
        }
     
  },
 
 methods: {

   visitPlace(placeSlug)
   {
      this.$router.push({name: 'PlaceView', params:{id: placeSlug}})
   },
 },

 filters:{
     distance(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " KM"
    }
 }
}
</script>

<style lang="stylus">
.toolbox
  display: grid
  grid-template-columns: repeat(3,33.3%)
  width: 700px
  margin: 0 auto
  padding: 0px 30px 10px 10px
  text-align: center
  background-color: #3f51b5;
  grid-column-gap: 10px;
.toolbox-item
  width: 100%
  height: 100%
  padding: 10px 0px
  background-color: white

.list-card
  display: block
  width: 700px
  border-radius: 5px
  margin-bottom: 16px
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
.agent-prompt
  display:none
@media screen and (max-width: 1080px)
  .container--mobile
    width="100%"
    padding: 0px 0px !important
  .list-card
    width: 100%
    margin: 0px 0px
    padding: 0px 0px
    border-bottom: 2px solid #ddd
    border-radius: 0px
    box-shadow: 0px 0px
    padding-bottom: 5px
  .toolbox
    width: 100%
  .headline--mobile
    font-size: 20px
    font-weight: 400

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
