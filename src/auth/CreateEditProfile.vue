<template>
 <v-container grid-list-md text-xs-center class="page-wrapper">
  <v-layout row wrap>
     <v-flex xs12>
       <v-card  v-bind="card_style" >
                        <v-card-title primary-title>
                           <v-subheader>Your Profile</v-subheader>
                        </v-card-title>
                            <v-text-field
                            outline
                            name="agency_name"
                            label="Company Name"
                            id="agency_name"
						    :error-messages="serverErrors.agency_name ? serverErrors.agency_name : errors.collect('agency_name')"
                            v-validate="'required|alpha_spaces'"
                            data-vv-name="agency_name"
                            v-model="profile.agency_name"
                            required
                            @blur="setAgentHandle"
                            ></v-text-field>

                            <v-text-field
                            outline
                            name="agent_handle"
                            label="Your Handle"
                            id="agent_handle"
                           :error-messages="serverErrors.agent_handle ? serverErrors.agent_handle : errors.collect('agent_handle')"
                            v-validate="'required'"
                            disabled
                            data-vv-name="agent_handle"
                            v-model="profile.agent_handle"
                            required
                             ></v-text-field>
    
                            <v-text-field
                            outline
                            name="phone_number_main"
                            label="Main Phone Number"
                            id="phone_number_main"
						    :error-messages="serverErrors.phone_number_main ? serverErrors.phone_number_main : errors.collect('phone_number_main')"
                            v-validate="'required'"
                            data-vv-name="phone_number_main"
                            v-model="profile.phone_number_main"
                            required
                             ></v-text-field>

                            <v-text-field
                            outline
                            name="phone_number_other"
                            label="Other Phone Number"
                            id="phone_number_other"
						    :error-messages="serverErrors.phone_number_other ? serverErrors.phone_number_other : errors.collect('phone_number_other')"
                            v-validate="'required'"
                            data-vv-name="phone_number_other"
                            v-model="profile.phone_number_other"
                            ></v-text-field>

                        
                            <v-text-field
                                outline
                                name="country"
                                label="Your country"
                                id="country"
                                v-validate="'required'"
                                data-vv-name="country"
						         :error-messages="serverErrors.country ? serverErrors.country : errors.collect('country')"
 
                                v-model="profile.country"
                                required
                            ></v-text-field>

                            <v-text-field
                                outline
                                name="office_address"
                                label="Address"
                                v-model="profile.office_address"
						        :error-messages="serverErrors.office_address ? serverErrors.office_address : errors.collect('office_address')"

                                id="address"
                            ></v-text-field>
                            
                             <v-textarea
                                label="About Us"
                                name="about_us"
                                v-model="profile.about_us"
                                :counter="200"
						        :error-messages="serverErrors.about_us ? serverErrors.about_us : errors.collect('about_us')"
                                v-validate="'required|max:200|alpha_spaces'"
                                data-vv-name="about_us"
                                outline
                            ></v-textarea>
                         <v-card-actions>
                             <v-btn color="success" @click="submit" :disabled="loading" :loading="loading">Submit</v-btn>
                         </v-card-actions>
                         </v-card>
                       </v-flex>
                     </v-layout>
                   </v-container>
 </v-layout>    

</template>

<script>
import HandleRequest from '@/mixins/RequestHandler.js'
export default {
  data(){
      return {
          profile:{
              phone_number_main:'07059939990',
              phone_number_other:'07059939923',
              company_email:'company@gmail.com',
              office_address:'James Watt Street Benin',
              state:'Edo',
              country:'Nigeria',
              agency_name:'Our Hope Accomodation',
              about_us:'We provide accomodation to young families',
              agent_handle: ''
          }
          
      }
  },
  mixins: [ HandleRequest],
  created(){
      //check if route params was passed
      if(this.$route.params.agentSlug){
          //get the user profile
          this.getMyProfile()
          this.setAgentHandle()
      }
  },
  computed: {
         card_style(){

           if(!this.$vuetify.breakpoint.smAndDown){
             return {
              "width": "500",
              "class": "mx-auto pa-2",
             }
           }else{
             return {
              "class": "mx-auto px-2",
               }
           }
         }
      },
  methods:{
    setAgentHandle(){
       if(this.profile.agency_name.length < 1)return
        let agencyName = this.profile.agency_name.trim()
          if(agencyName.charAt(0) !== "@"){
             agencyName  = '@'.concat(agencyName) 
          }

        this.profile.agent_handle = agencyName.replace(/\s/g,"_").toLowerCase()
    },
    submit(){
         this.$validator.validate().then(result => {
        			if (result) {
						this._submitProfile()
       				 }
      			})
    },
    
    _submitProfile(){
         let profileData = new FormData()
         const profile = this.profile
         for(var k in profile){
             if(profile.hasOwnProperty(k)){
                 profileData.append(k,profile[k])
             }
         }
         this.mixin_handleRequest(this.$store.dispatch('auth/submitProfile',profileData)
                                .then(response => {
                                    let slug = this.$store.getters['auth/getUser'].slug
                                    this.$router.push({name: 'AgentProfileView', params: { agentSlug: slug }})
                            }))
    },

    getMyProfile(){
         this.mixin_handleRequest(this.$store.dispatch('auth/getMyProfile')
                    .then(response => {
                
         })) 
    },
  }//end methods
}
</script>

<style>

</style>
