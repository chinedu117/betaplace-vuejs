<template>
<div>
      
      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
           

              <v-list two-line subheader class="pt-2" v-if="places.length > 0">
                  
                 <div class="d-flex justify-space-between">
                    <v-subheader>Your Places <v-chip align-end>{{ places.length}}</v-chip></v-subheader>
                    
                </div>
                 
                <template 
                  v-for="(place,index) in places"
                  
                  >
                  <div 
                  :index="index"
                  :key="place.id"
                  >
                  <!-- <v-subheader >{{ place.category }}</v-subheader> -->
                  <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
                  <v-list-tile ripple avatar  >
                    <v-list-tile-avatar >
                    <v-avatar color="blue-grey lighten-5">
                      <v-icon @click="editPlace(place.slug)">edit</v-icon>
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
                      
                      <flags :expired="place.expired" :published="place.agent_published" />
                      
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <place-actions 
                        :published="place.agent_published" 
                        :expired="place.expired" 
                        :slug="place.slug"
                        :index="index" 
                        v-on:delete-place="deletePlace"
                        v-on:place-published="publishPlace"
                        v-on:place-unpublished="unPublishPlace"
                        >
                          
                        </place-actions>
                     <!-- <v-avatar color="blue-grey lighten-5" >
                        
                         <v-icon @click="deletePlace(place.slug,index)" color="primary">delete</v-icon>
                        
                      </v-avatar> -->
                    </v-list-tile-action>
                   
                  </v-list-tile>
                   <v-divider inset></v-divider>
                  </div>
                </template>
                <v-list-tile>
                    <v-btn color="success" class="mx-auto" outline @click="seePlanList()">Subscribe to Add more Places</v-btn>
                </v-list-tile>
              </v-list>
              
              <div v-else class="pa-2 ma-3 text-xs-center subheading font-weigh-bold text--grey">
                Nothing to display
               
                </div>
          </v-flex> <!-- End template for mobile display -->
          <v-btn fab dark  color="primary" fixed bottom style="right: 40%"  @click="createPlace()">
              <v-icon dark>add</v-icon>
          </v-btn>
      </v-layout>
      
</div>
</template>

<script>
import HandlesRequest from '@/mixins/RequestHandler'
import Service from './Service.js'
import PlaceActions from "./components/PlaceActions"
import Flags from "./components/Flags"
export default {
    service: new Service(),
   data(){
       return {
           placeList:[],
       }
   },
   components: { PlaceActions, Flags},
   mixins: [HandlesRequest],
   created(){
        //load places
        this.mixin_handleRequest(this.$options.service.getAgentPlacesList({agent_slug:this.$route.params.agentSlug})
                              .then(response =>{
                                 response.data.forEach((place) => {
                                 this.placeList.push(place)
                    })
        }))//end handler
   },
   computed:{
       places(){
           return this.placeList
       }
   },
    methods:{
        publishPlace(index){
            let place = this.placeList[index]
            
             place.agent_published = 1
             this.placeList.splice(index,1,place)
          
        },
        unPublishPlace(index){
             let place = this.placeList[index]
             place.agent_published = 0
             this.placeList.splice(index,1,place)
         
            
        },
        createPlace(){
            //check if the agenet still has enough subscription
            if(this.$store.getters['auth/getUser'].max_no_places > 0)
            {
              this.$router.push({name: 'createEdit'})
            }else{
              this.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'You do not have enough subscription to continue',
                    color: ''
                    })
              this.seePlanList()
            
            }
            
        },

        editPlace(slug){
            
            this.$router.push({name: 'createEdit',params:{placeSlug:slug}})
        },
        deletePlace(index){
            this.placeList.splice(index,1)

        },

        seePlanList(){
            this.$router.push({name: "ourPackages"})
        }
    },

}
</script>

<style>

</style>
