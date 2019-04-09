<template>
    <div> 
      <v-layout row v-if="false">
        <v-flex  xs12>
        <!-- template for mobile phones -->
          <v-list two-line subheader class="pt-2" v-if="places.length > 0">
                  
                 <div class="d-flex justify-space-between">
                    <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
                 
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
                
                <load-more/>
              </v-list>
              
            
              <div v-else class="pa-2 ma-3 text-xs-center subheading font-weigh-bold text--grey">
                Nothing to display
                </div>
          </v-flex> <!-- End template for mobile display -->
   
      </v-layout>
      
     
      <!-- <v-container grid-list-xs  v-if="true">
        <v-layout row wrap>
            <v-flex md8 lg8 >
        <div
         v-if="places.length > 0"
        > 
           <div class="d-flex justify-space-between">
                    <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
           <v-card
             class="mb-2 mx-auto"
             v-bind="card_style"
             v-for="(place, index) in places"
             width="700px"
             style="border-radius:5px"
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
                     <span class="grey--text font-weight-medium" v-show="hasUserCoords" v-if="place.distance"> approx <b>{{place.distance | distance }}</b> from your location</span>
                   </v-flex>
                 </v-layout>
              
               
               
             </v-card-actions>
           </v-card>
            <load-more/>
         </div> --> <!-- large screen display wrapper -->
      <v-container grid-list-xs  v-if="true">
        <v-layout row wrap>
            <v-flex md8 lg8 >
        <div
         v-if="places.length > 0"
        > 
           <div class="d-flex justify-space-between">
                    <v-subheader>Available Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
           <div
             class="list-card"
             v-bind="card_style"
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
                     <span class="grey--text font-weight-medium" v-show="hasUserCoords" v-if="place.distance"> approx <b>{{place.distance | distance }}</b> from your location</span>
                   </v-flex>
                 </v-layout>
              
               
               
             </v-card-actions>
           </div>
            <load-more/>
         </div>

         </v-flex>
         

          <v-flex md12 lg4 xs12>
                <subscribe/>
                
         </v-flex>

      

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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
.agent-prompt
  display:none
@media screen and (max-width: 1080px)
  .list-card
    width: 100%
    margin: 0px 0px
    padding: 5px
    border-bottom: 2px solid #ddd
    border-radius: 0px
    box-shadow: 0px 0px
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
