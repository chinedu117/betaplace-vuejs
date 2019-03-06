<template>
    <div>
      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
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
                  :key="Math.random() + '_' + place.id"
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
      
     
      <v-container grid-list-xs  v-if="$vuetify.breakpoint.mdAndUp">
        <v-layout row wrap>
            <v-flex md8 lg8 >
        <div
       
        > 
           <v-card
            class="mb-2"
            v-for="(place, index) in places"
             :key="place.slug"
             :index = "index"
              
            >
             
             <v-card-title class="text-xs-left mb-0 pb-0">
               <div>
                 
                 <span class="headline">{{place.category.name}}</span>
                 <div class="text--grey lighten-4 subheading text-capitalize">
                  <v-icon class="pr-2 lighten-4" >place</v-icon>
                  <span class="text-capitalize">{{ place.location }}</span>
                </div>
               </div>
             </v-card-title>


             <v-card-text class="text-xs-left">

                <span class=" wrap">{{ place.description }}</span><br>
                <v-chip color="secondary">
                  <span class="red--text text--darken-2" v-html="place.price | currency "></span>
                </v-chip>

             </v-card-text>
             <v-card-actions>
               <v-btn flat color="accent" @click="vistPlace(place.slug)">Lets visit it</v-btn>
               <v-btn flat color="accent">Tell My Frieind</v-btn>
             </v-card-actions>
           </v-card>

         </div> <!-- large screen display wrapper -->


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
import LoadMore from '@/features/places_list/components/LoadMore.vue'

export default {
  name: 'places-list',
  data () {

    return {
      //  places: this.$store.getters['places_list_store/placesFiltered'],
       
    }
  },
 
  components: { Subscribe, LoadMore},
 
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
    
    places:{
        get(){
            return this.$store.getters['places_list_store/placesFiltered']

        },
        set(val){}

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
