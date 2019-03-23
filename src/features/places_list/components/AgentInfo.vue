<template>	
  
  <div>
     <v-card color="grey lighten-4" v-if="$vuetify.breakpoint.mdAndUp">
		<v-toolbar
          color="red darken-2"
         dark
         >
          
          <v-toolbar-title>{{ agentInfo.agency_name }}</v-toolbar-title>
           <v-spacer></v-spacer>
           <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-tile :to="{name : 'Agent', params:{ 'agentSlug': agent_slug}}">
                <v-list-tile-title>Our Places</v-list-tile-title>
              </v-list-tile>
              <!-- <v-list-tile>
                <v-list-tile-title>Subscribe</v-list-tile-title>
              </v-list-tile> -->
            </v-list>
          </v-menu>
        </v-toolbar>
                <v-layout>
                  <v-flex md4> 
                    
                       <v-img

                         :src="imageSource"
                         aspect-ratio="1"
                       ></v-img> 
                       <slot name="uploader"></slot>
                 </v-flex>
                  <v-flex md8>
                    <v-card-text class="headline font-weight-bold text-md-center" >
                      {{ agentInfo.about_us }}
                   </v-card-text>
                  </v-flex>
                 
                </v-layout>
                <v-card-actions class="elevate-1"> 
                    <div class="mb-1">
                       <v-avatar :size="60" color="blue lighten-4"> 
                          <v-icon size="40">phone</v-icon>
                       </v-avatar>
                        <div class="d-inline pa-2  title font-weight-medium">{{ agentInfo.phone_number_main }}
                        </div>
                      </div>
                      <div class="d-flex">
                       <v-avatar :size="60" color="red lighten-4"> 
                          <v-icon size="40">business</v-icon>
                       </v-avatar>
                        <div class="pa-2  title font-weight-medium" :inner-html.prop="buildAddress(agentInfo.office_address,agentInfo.country) | insertBreaks">
                       
                        </div>
                        </div>
                </v-card-actions>
                 
              </v-card>

		       <v-card v-else class="pa-2 ma-2">	
				 <v-toolbar
                  color="red darken-2"
                  dark
                  >
      
          				<v-toolbar-title>{{ agentInfo.agency_name }}</v-toolbar-title>
           				<v-spacer></v-spacer>
                  <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-tile :to="{name : 'Agent', params:{ 'agentSlug': agent_slug}}">
                <v-list-tile-title>Our Places</v-list-tile-title>
              </v-list-tile>
              <!-- <v-list-tile>
                <v-list-tile-title>Subscribe</v-list-tile-title>
              </v-list-tile> -->
            </v-list>
          </v-menu>
        		</v-toolbar>
                       <v-img
						 :max-width="500"
                         :src="imageSource"
                         :aspect-ratio="500/300"
                       ></v-img> 
                       <slot name="uploader"></slot>
                 
                    <v-card-text class="subheading font-weight-bold text-md-center" >
                      {{ agentInfo.about_us }}
                   </v-card-text>

                   <v-card-actions class="elevate-1 "> 
					  <v-container>
					  	<v-layout row>	
					  <v-flex xs6>

                      <v-layout class="d-flex column" align-center justify-start>

                       <v-avatar :size="60" color="blue lighten-4"> 
                          <v-icon size="40">phone</v-icon>
                       </v-avatar>
                        <div class="d-inline pa-2  subheading font-weight-medium">{{ agentInfo.phone_number_main }}
                        </div>
                      </v-layout>
                      </v-flex>
                      <v-flex xs6>
                      <v-layout class="d-flex column" align-center justify-start>
                       <v-avatar :size="60" color="red lighten-4"> 
                          <v-icon size="40">business</v-icon>
                       </v-avatar>
                        <div class="pa-2  subheading font-weight-medium" :inner-html.prop="buildAddress(agentInfo.office_address,agentInfo.country) | insertBreaks">
                       
                        </div>
                        </v-layout>
                    </v-flex>
                    </v-layout>
                </v-container>
                </v-card-actions>

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
  	 	
  	 	}
  	 },
  	 props:{
  	 	"agent_slug":{
  	 		required: true,

  	 	},
      "image_src": {
         required: false,
      }
  	 },
     mixins:[ insertBreaksFilter ],
     created(){
     	//get the information
     	this.$store.dispatch("place_view_store/retrieveAgentInfo",this.agent_slug)
     },
     mounted(){
     	this.$store.dispatch("common/updateTitle",this.agentInfo.agency_name)

     		document.title = this.agentInfo.agency_name
     },

     computed:{
         agentInfo(){

         	return this.$store.getters["place_view_store/agentInfo"]
         },
         imageSource(){

                return this.image_src ?  this.image_src : this.agentInfo.profile_img

         }
     },

     methods:{

     },

     



  }
</script>