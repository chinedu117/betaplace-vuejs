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
                        v-on:place-renewd="unexpirePlace"
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
       
            <v-container v-else >
               <v-layout row wrap grid-list-xs >
                  <v-flex md8 lg8 >
                    <template 
                         v-for="(place,index) in places"
                  
                      >
                        <div 
                        :index="index"
                        :key="Math.random() + '_' + place.slug"
                        >
                          <v-card height="auto" class="mb-3" width="100%">

                            <div class="pa-3" color="grey darken-3" width="100%" style="background-color:#dddd">
                                  <v-layout row wrap>
                                      <v-flex md8>
                                       <span class="headline">{{ place.category.name }}</span>
                                     </v-flex>
                                     <v-flex md4>
                                       <span  class="text-md-right red--text font-weight-medium" >{{ place.price | currency }}</span>
                                     </v-flex>
                      
                                  </v-layout>
                            </div>

                           <v-card-text class="text-xs-left">
                                <div class=" text--grey lighten-4 subheading text-capitalize">

                                    <v-icon class="pr-2 lighten-4" >place</v-icon>
                                    <span class="text-capitalize">{{ place.location }}, {{ place.state }}</span><br>

                                </div>
                                 
                                 {{ place.description }}
                                
                            </v-card-text>
                            
                             
                             <v-card-actions>
                              
                                   <div class=" d-inline text--grey lighten-4 subheading text-capitalize">
                                    
                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >thumb_up</v-icon>
                                          <span class="text-capitalize">{{place.statistics.like_no}}</span>
                                        </div>

                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >place</v-icon>
                                          <span class="text-capitalize">{{place.statistics.map_no}}</span>
                                        </div>

                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >share</v-icon>
                                          <span class="text-capitalize">{{place.statistics.share_no}}</span>
                                        </div>

                                        <div class="d-inline px-2 mx-2">
                                          <v-icon class="lighten-4" >visibility</v-icon>
                                          <span class="text-capitalize">{{place.statistics.seen_no}}</span>
                                        </div>

                                        <flags :expired="place.expired" :published="place.agent_published" />

                                        <place-actions 
                                          :published="place.agent_published" 
                                          :expired="place.expired" 
                                          :slug="place.slug"
                                          :index="index" 
                                          v-on:delete-place="deletePlace"
                                          v-on:place-published="publishPlace"
                                          v-on:place-unpublished="unPublishPlace"
                                          v-on:place-renewed="unexpirePlace"
                                          v-on:place-edit="editPlace"
                                          class="d-inline"
                                          >
                                            
                                          </place-actions>
              
                                  </div>
                                   
                             </v-card-actions>
                                    

                          </v-card>

                        </div>

                      </template>

                        <v-btn color="success" class="mr-3 " outline @click="seePlanList()">Click to increase your limits</v-btn>


                      <v-btn fab dark  color="primary" fixed bottom v-bind="floating_button_style"  @click="createPlace()">
                        <v-icon dark>add</v-icon>
                    </v-btn>

                  </v-flex>


                  <v-flex md4 lg4>

                    <v-card style="position:fixed" class="ml-2">
                           <div class="pa-3" color="grey darken-3"  width="100%" style="background-color:#ddd">
                                 <span class="headline">
                                     Account Summary                                  
                                  </span>
                                  
                              </div>
                              <v-card-text>
                                <div class="account-summary-row">
                                  <div class="account-summary-row--cell">
                                     Total Places
                                  </div>
                                  <div class="account-summary-row--cell">
                                     {{ account_summary.places_no }}
                                  </div>
                                </div>
                                <div class="account-summary-row">
                                  <div class="account-summary-row--cell">
                                   Subscriptions
                                   
                                  </div>

                                  <div class="account-summary-row--cell">
                                     {{ account_summary.subscriptions_no }}
                                    
                                   </div>
                                   
                                </div>
                                <div class="account-summary-row">
                                  <div class="account-summary-row--cell">
                                   Slots Remaining
                                  </div>
                                  <div class="account-summary-row--cell">
                                     {{ account_summary.slots_remaining }}
                                   </div>
                                </div>
                                <div class="account-summary-row">
                                  <div class="account-summary-row--cell">
                                     Expiry Date
                                  </div>
                                  <div class="account-summary-row--cell">
                                      {{ account_summary.slots_remaining }}
                                  </div>
                                </div>
                              </v-card-text>


                    </v-card>
                    
                  </v-flex>
                </v-layout>
            </v-container>
            <!-- end v-else -->
       
      
</div>
</template>

<script>
import store from '@/store'
import HandlesRequest from '@/mixins/RequestHandler'
// import Service from './Service.js'
import PlaceActions from "./components/PlaceActions"
import Flags from "./components/Flags"


export default {
    // service: new Service(),
    data(){
       return {
          
       }
   },
    beforeRouteEnter(to,from,next){
      //if have no profile or statistic go back profile page
     
       
        const hasProfile = store.getters['auth/userHasProfile']
        const hasVerifiedEmail = store.getters['auth/userEmailVerified']

        if(!hasVerifiedEmail){
               store.dispatch("common/updateSnackBar",{
                  
                    show: true,
                    msg: 'Verify your email to proceed',
                    color: ''
               })
               next({name: 'VerifyEmail'})
             }

        if(!hasProfile){ 
                 store.dispatch("common/updateSnackBar",{
                  
                    show: true,
                    msg: 'Set up your profile to upload your places',
                    color: ''
               })
                 next({ name: 'AgentProfile'})
            }

      next()
   },

   

   components: { PlaceActions, Flags},

   mixins: [HandlesRequest],

   
   created(){
        //load places
       const sm = this
      this.$store.dispatch("dashboard_store/retrieveAgentPlacesList",{agent_slug:this.$route.params.agentSlug})
      .then(response =>{
                 return sm.$store.dispatch("dashboard_store/retrieveMySubscriptions")
                        
           })

   },
   computed:{
       account_summary(){
           return this.$store.getters['dashboard_store/summary']
       },
       floating_button_style(){
         if(this.$store.state.common.sidebar.visible){

            return {
                      "style":"left: 20%; top: 18%"
              }
         }else{
             return {
                      "style":"left: 8%; top: 18%"
              }
         }
       },
       places(){
           return this.$store.getters['dashboard_store/places']
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
        unexpirePlace(index){
             let place = this.placeList[index]
             place.expired = 0
             this.placeList.splice(index,1,place)
        },
        createPlace(){
            //check if the agenet still has enough subscription

            if(this.$store.getters['auth/getUser'].agent_statistics.max_no_places > 0)
            {
              this.$router.push({name: 'createEdit',params:{agentSlug:this.$route.params.agentSlug}})
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
            
            this.$router.push({name: 'createEdit',params:{agentSlug:this.$route.params.agentSlug ,placeSlug:slug}})
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

<style lang="stylus">
  .account-summary-row
    width: 80%
    padding: 0 2px
    height: auto
    margin: 0 auto
    display: inline-block
    border: 5px solid #dddd

    &--cell
      border-color: #dddd
      border-width: 2px
      display: inline
      float: left
      padding: 5px
      height: auto

    &--cell:first-child
      width: 40%

    &--cell:last-child
        width: 60%
        padding-left: 10px
        border-left: 5px solid #dddd




</style>
