<template>
        <div>
      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
           <v-tabs
               v-model="tabActive"
               color="accent"
               dark
               grow
               slider-color="primary"
           >
               <v-tab ripple>
                   PHOTO
               </v-tab>
               <v-tab ripple>
                   DETAILS
               </v-tab>
               <v-tab ripple>
                   AGENT
               </v-tab>
               <v-tab-item>
                   <v-subheader class="font-weight-bold">VIEWS</v-subheader> 
                   
                  <v-card 
                        flat 
                        class="pa-2 mb-2"
                        v-for="(image, index) in place.images.images"
                        :key="index"
                        color="grey lighten-2"
                        >
                       

                       <v-img 
                        :src="image.src"
                        aspect-ratio="1"
                         max-width="800px"
                         
                         >
                         
                            <v-layout 
                                slot="placeholder"
                                fill-height
                                align-center
                                justify-center
                                ma-0
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5">

                                    </v-progress-circular>
                            </v-layout>
                       </v-img>

                       
                        <v-card-title class="pb-2" >
                            <div class="text-truncate subheading font-weight-bold">
                                {{ image.title }}
                            </div>
                              
                        </v-card-title >
                        <v-card-text class="pt-0">

                            <read-more 
                                more-str="Read more" 
                                :text="image.description" 
                                link="#" 
                                less-str="Read Less" 
                                :max-chars="50"
                                class="text--grey"
                                >
                            </read-more>
                           
                       </v-card-text>
                   </v-card>
               </v-tab-item>
               <v-tab-item>
                   <v-card flat class="pa-2">
                       <v-card-title class="font-weight-bold pb-2">
                            <h1 class="hash" id="desc" @click="$vuetify.goTo('#desc',scrollOptions)">
                                {{ place.category.name }}
                            </h1>
                        </v-card-title>
                        <v-card-text class="pt-0">
                            
                            <p>{{ place.description }}</p>
                        </v-card-text>
                         <v-card-title class="font-weight-bold pb-2">
                            <h1 class="hash">
                                Location
                            </h1>
                        </v-card-title>
                        <v-card-text class="pt-0">
                        
                           <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(place.address,place.location,place.state,place.country) | insertBreaks">
                           </p>
                            
                        </v-card-text>

                        <v-card-title class="font-weight-bold pb-2" id="price">
                            <h2 class="hash" @click="$vuetify.goTo('#price',scrollOptions)">
                               Price: {{ place.price | currency }}
                            </h2>
                        </v-card-title>
                        <v-card-text class="pt-0">
                         <p>{{ place.price_description }}</p>
                        </v-card-text>
                         <v-card-title class="font-weight-bold pb-2" id="spec">
                            <h1 class="hash" @click="$vuetify.goTo('#spec',scrollOptions)">
                                Details
                            </h1>
                        </v-card-title>
                        
                          <v-container grid-list-xs class="pb-5" >
                              <v-layout 
                              row 
                              wrap 
                              v-for="(feature,index) in place.features.features" 
                              :key="index"
                              :index="index"
                              fill-height
                               >
                                <v-flex xs4 fill-height>
                                    <div  class="pa-2 grey lighten-4 font-weight-bold " style="word-wrap:break-word"> 
                                        {{ feature.feature }}
                                    </div>
                                    
                                </v-flex>
                                <v-flex xs8 fill-height> 
                                    <div style="height:auto" class="d-block pa-2 grey lighten-4">
                                         {{ feature.value }}
                                    </div>

                                </v-flex>
                                
                              </v-layout>
                              
                          </v-container>

                    

                        


                         <v-divider></v-divider>
                        <v-card-actions height="100px" background-color="blue-grey lighten-5">
                         
                              <action-btn
                               :stat_id="place.statistics.id"
                               color="accent"
                               class="action-btn-mobile"
                               :longitude="place.longitude"
                               :latitude="place.latitude"
                               :likes="place.statistics.like_no"
                               :agentID="place.agent.id"
                                  />
                        </v-card-actions>
                       
                   </v-card>
               </v-tab-item>
               <v-tab-item>
                   
                    <v-subheader class="pb-0 font-weight-bold">AGENT INFO</v-subheader>
                      <agent-info
                         :agent_slug="place.agent.slug"
                        />
                         
                           <!-- <rate-agent
                                :agent_rating="place.agent.rating"
                                :agent_id="place.agent.id"
                                class="mx-auto"
                          >

                          </rate-agent> -->
                         
                          
                       
                           
               </v-tab-item>
           </v-tabs>   
              
          </v-flex> <!-- End template for mobile display -->
   
      </v-layout>

        <v-container grid-list-md v-if="$vuetify.breakpoint.mdAndUp">
            <v-layout row wrap>
                <v-flex md8 lg8 xs12>
                    <v-card height="auto">
                        <v-toolbar>
                          
                            <v-toolbar-title>
                                {{ place.category.name }}
                                
                            </v-toolbar-title>
                    
                            <v-spacer></v-spacer>
                            <v-toolbar-items class="hidden-xs-only">
                                <v-btn flat @click="$vuetify.goTo('#desc',scrollOptions)">Description</v-btn>
                                <v-btn flat  @click="$vuetify.goTo('#spec',scrollOptions)">Details</v-btn>
                                <v-btn flat  @click="$vuetify.goTo('#price',scrollOptions)">Price</v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-carousel
                            cycle
                            lazy
                            dark light
                            delimiter-icon="fiber_manual_record"
                            height="600px"
                            next-icon="chevron_right"
                            prev-icon="chevron_left"
                        
                        >
                            <v-carousel-item
                            
                                transition="tab-transition"
                                v-for="(image,i) in place.images.images"
                                :key="i"
                                :src="image.src"
                            ></v-carousel-item>
                        </v-carousel>
                        <v-card-title class="font-weight-bold">
                            <h1 class="hash" id="desc" @click="$vuetify.goTo('#desc',scrollOptions)">
                                {{ place.category.name }}
                            </h1>
                        </v-card-title>
                        <v-card-text>
                            
                           <p>{{ place.description }}</p>
                        </v-card-text>
                         <v-card-title class="font-weight-bold">
                            <h1 class="hash">
                                Location
                            </h1>
                        </v-card-title>
                        <v-card-text>
                        
                            <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(place.address,place.location,place.state,place.country) | insertBreaks">
                             
                            </p>
                        
                        </v-card-text> 
    
                         <v-card-title class="font-weight-bold" id="spec">
                            <h1 class="hash" @click="$vuetify.goTo('#spec',scrollOptions)">
                                Details
                            </h1>
                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-xs class="pb-5" >
                              <v-layout 
                              row 
                              wrap 
                              v-for="(feature,index) in place.features.features" 
                              :key="index"
                              :index="index"
                              fill-height
                               >
                                <v-flex xs4 fill-height>
                                    <div  class="pa-2 grey lighten-4 font-weight-bold " style="word-wrap:break-word"> 
                                        {{ feature.feature }}
                                    </div>
                                    
                                </v-flex>
                                <v-flex xs8 fill-height> 
                                    <div style="height:auto" class="d-block pa-2 grey lighten-4">
                                         {{ feature.value }}
                                    </div>

                                </v-flex>
                                
                              </v-layout>
                              
                          </v-container>
                          <v-divider></v-divider>       

                        </v-card-text> 

                        <v-card-title class="font-weight-bold" id="price">
                            <h2 class="hash" @click="$vuetify.goTo('#price',scrollOptions)">
                               Price: {{ place.price | currency }}
                            </h2>

                        </v-card-title>
                             <v-card-text class="">
                               <p>{{ place.price_description }}</p>
                             </v-card-text>
 
                         <v-divider></v-divider>
                        <v-card-actions height="100px" style="position:relative" background-color="blue-grey lighten-5">
                           
                             <custom-dialog :width="500">
                               <agent-info
                                :agent_slug="place.agent.slug"
                               ></agent-info>
                             </custom-dialog>

                              <action-btn
                               :stat_id="place.statistics.id"
                               color="accent"
                               class="action-btn-screen"
                               :longitude="place.longitude"
                               :latitude="place.latitude"
                               :likes="place.statistics.like_no"
                               :agentID="place.agent.id"
                                />
                        </v-card-actions>
                       
                    </v-card>
                </v-flex>
                
                <v-flex md4 lg4 xs12>
                    <subscribe/>
                
                </v-flex>
             </v-layout>
        </v-container>
   </div>
    
</template>
<script>

import store from './store'
import Subscribe from '@/components/Subscribe.vue'
import ActionBtn from './components/ActionBtn.vue'
// import RateAgent from './components/RateAgent.vue'
import insertBreaksFilter from  '@/mixins/InsertBreaksFilter'
import AgentInfo from '@/features/places_list/components/AgentInfo.vue'
import CustomDialog from '@/components/Dialog.vue'
export default {
    name: 'place-view',
    mixins:[insertBreaksFilter],
    data(){
        return {
          
           tabActive: null,
        //    place:{
        //        latitude: 47.5951518,
        //        longitude: -122.3316393,
        //        likes: 1000000,
        //        images: [
        //             {title:'Sitting Room',
        //             description:'15ft by 15ft. Well painted. Has Dining section',
        //             src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'},
        //             {title:'Kitchen',
        //             description:'Good function drain, Has a chimney and fire detector, The drain is connected to a sub-surface system',
        //             src:  'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
        //             {title:'Dining Room',
        //             description:'Spacious',
        //             src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'}
        //          ],
        //        agent:{
        //            id:"1",
        //            name:"ABD Consult",
        //            phone: "0908764531",
        //        },
        //    },
          
           scrollOptions: {
                 duration: 300,
                 offset: -80,
                 easing: 'easeInOutCubic',
           },

        
        
        }
    },
    beforeRouteEnter(to,from,next){

      next()
    },

    created() {
        this.$nextTick(() => {
            this.$store.dispatch('place_view_store/retrievePlace',this.$route.params.id)
        })
        
    },
    components: {
        Subscribe, ActionBtn, AgentInfo, CustomDialog
    },
    computed: {
       
        place() {
         
              return this.$store.getters['place_view_store/place']
         
           
          
        },
        
    },
    methods:{

    }
}
</script>
<style>
  .hash::before {
     content: '# '; 
     color:red;
  }

  .action-btn-mobile {
   z-index: 1000000;
   position: fixed;
   padding: 10px;
   background-color:#3f51b5;
   left: 0px;
   bottom:0px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   flex-direction: row;
 }
</style>
