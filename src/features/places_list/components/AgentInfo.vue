<template>	
  
  <div>


     <v-card  v-bind="card_style">
      <!-- header -->
        <div class="pa-3 text-xs-left" height="250px" color="grey darken-3" width="100%" style="border-bottom:3px solid #dddd">
                  <v-layout row wrap>
                      <v-flex md10>
                       <span class="headline text-capitalize">
                          {{ agentInfo.agency_name }}
                       </span><br>
                       <span class="grey--text subheading text-lowercase" style="letter-spacing: 2px; overflow: hidden">
                        {{ agent_slug }}
                       </span>
                     </v-flex>
                     <v-flex md2>
                        <v-avatar>
                          <v-icon @click="toggleHideBody" v-if="details_shown">visibility</v-icon>
                          <v-icon @click="toggleHideBody" v-else>visibility_off</v-icon>
                        </v-avatar>
                     </v-flex>
                 </v-layout>
            </div>
         <!-- header -end -->
               <!-- Hide body -->
		            <div ref="profile_body">
                <v-layout row>
                  <v-flex xs12> 
                    
                       <v-img
                         max-width="700px"
                         :src="imageSource"
                         :aspect-ratio="4/3"
                         
                       >
                          <slot name="uploader"></slot>
                       </v-img> 
                      
                  </v-flex>
                </v-layout>
                 
                 <!-- about us goes here -->
                 <v-card-text class="text-xs-left" >

                       <v-expansion-panel width="100%">
                          <v-expansion-panel-content>
                            <template v-slot:actions>
                              <v-icon color="primary">$vuetify.icons.expand</v-icon>
                            </template>
                            <template v-slot:header>

                              <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize ">
                                  <v-icon>people_outline</v-icon> About us
                                </span>

                            </template>
                            <v-card>
                              <v-card-text class="grey lighten-3">
                                 <p style="font-size: 18px; line-height: 1.8">
                          
                                    <read-more 
                                            more-str="Read more" 
                                            :text="agentInfo.about_us" 
                                            link="#" 
                                            less-str="Read Less" 
                                            :max-chars="350"
                                            class="text--grey"
                                            >
                                        </read-more>
                                      </p>

                              </v-card-text>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                 </v-card-text>
                  <!-- about us ends -->


                <v-card-actions class="elevate-1"> 
                   <v-layout row wrap justify-center>
                     <v-flex xs12 md6>
                           <div class="pl-3">
                                <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize">
                                  <v-icon>phone</v-icon> Phone </span>

                                  <div class="pa-2  title font-weight-medium">
                                      {{ agentInfo.phone_number_main }}
                                  </div>
                        </div>
                     </v-flex>
                     <v-flex xs12 md6>

                       <div class="pl-3">
                                <span style="letter-spacing: 2px; font-size:18px" class="grey--text font-weight-medium text-capitalize">
                                  <v-icon>business</v-icon> Address </span>

                                  <div class="pa-2 title font-weight-medium" :inner-html.prop="buildAddress(agentInfo.office_address,agentInfo.state,agentInfo.country) | insertBreaks">
                       
                                 </div>
                        </div>
                        
                     </v-flex>
                   </v-layout>

                     <!-- <v-list-tile :to="{name : 'Agent', params:{ 'agentSlug': agent_slug}}">
                          <v-list-tile-title>Our Places</v-list-tile-title>
                    </v-list-tile> -->
                      
                </v-card-actions>
                   <slot name="link"></slot>
                  </div>
              </v-card>
    </div>
</template>				
<script>	
   import store from '@/features/place_view/store'
   import insertBreaksFilter from  '@/mixins/InsertBreaksFilter'
  export default {
  	 name: "agent-info",
  	 data(){
  	 	return {
         details_shown: true
  	 	}
  	 },
  	 props:{
  	 	"agent_slug":{
  	 		required: true,

  	 	},
      "image_src": {
         required: false,
      },

      "show_body": {
         required: false,
         default: false,
         type: Boolean
      }
  	 },
     mixins:[ insertBreaksFilter ],
     created(){
     	//get the information
     	this.$store.dispatch("place_view_store/retrieveAgentInfo",this.agent_slug)

      
     },
     beforeMount(){
           
     },
     mounted(){
     	this.$store.dispatch("common/updateTitle",this.agentInfo.agency_name)
          //the default appearance
      this.$nextTick(() =>{
           if(this.show_body){
            console.log("showww",this.show_body)
           this.$refs.profile_body.style.display = "block"
          }else{
          console.log("no showww",this.show_body)
          this.$refs.profile_body.style.display = "none"
        }

      })
         
        // this.toggleHideBody()
     		document.title = this.agentInfo.agency_name
     },



     computed:{
        card_style(){
           
           let cardStyle = {
                             "style":"border-radius: 5px",
                              "class": "mx-auto  text-xs-left"
                              }
                              
           if(this.$vuetify.breakpoint.mdAndUp){
             return Object.assign(cardStyle,{"width": "700px"})
           }else{
             return Object.assign(cardStyle,{"width": "auto"})
           }
         },
         agentInfo(){

         	return this.$store.getters["place_view_store/agentInfo"]
         },
         imageSource(){

                return this.image_src ?  this.image_src : this.agentInfo.profile_img

         }
     },

     methods:{
        
        toggleHideBody(){
                
                let currentDisplay = this.$refs.profile_body.style.display
                 if(currentDisplay == "none"){
                    this.details_shown = true
                     this.$refs.profile_body.style.display = "block"
                 }else{
                       this.details_shown = false
                      this.$refs.profile_body.style.display = "none"
                 }
        }
     },

     



  }
</script>
<style>

</style>