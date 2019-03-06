<template>
<v-layout row v-if="$vuetify.breakpoint.smAndDown">
     <v-flex  xs12>
        <v-card
        class="ma-2"
        >
            <v-img
                :src="imageUrl ? imageUrl : profile.profile_img"
                aspect-ratio="2.75"
                height="200px"
                style="position:relative"
                >
                
                </v-img>
                <v-progress-linear :indeterminate="true" v-if="loading" class="mt-0"></v-progress-linear>
                <v-btn fab dark @click='pickFile'  style="right: 10%; top:21.2% " absolute  color="primary">
                    <v-icon dark>camera</v-icon>
                </v-btn>
                    <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                        >
               <v-card-title primary-title>
                    <div>
                        <span class="grey--text">{{ profile.statistics.no_places}}</span><br>
                        <h3 class="headline mb-0">{{ profile.agency_name }}</h3>
                        <div>{{ profile.about_us }}</div>
                    </div>

                    <div class="mt-4">
                        <span class="grey--text">ADDRESS</span><br>
                        
                        <div>{{ profile.office_address }}</div>
                        <div>{{ profile.state }},{{ profile.country }}</div>

                    </div>
                </v-card-title>
                <v-subheader class="font-weight-bold">CONTACT</v-subheader>
                <v-card height="auto" class=" justify-start pa-1">
                                <v-container grid-list-xs>
                                    <v-layout row wrap>
                                        <v-flex xs1>
                                                <v-icon size="24px" class="pa-2">chat</v-icon>
                                        </v-flex>
                                        <v-flex xs10 offset-xs1>
                                            <div class="d-block pa-2 font-weight-bold subheading ">
                                               {{profile.phone_number_main}}
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap v-if="profile.phone_number_other">
                                        <v-flex xs1>
                                                <v-icon size="24px" class="pa-2">chat</v-icon>
                                        </v-flex>
                                        <v-flex xs10 offset-xs1>
                                            <div class="d-block pa-2 font-weight-bold subheading ">
                                               {{profile.phone_number_other}}
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs1>
                                                <v-icon size="24px" class="pa-2">mail</v-icon>
                                        </v-flex>
                                        <v-flex xs10 offset-xs1>
                                            <div class="d-block pa-2 font-weight-bold subheading">
                                              {{ profile.email}}
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs1>
                                                <v-icon size="24px" class="pa-2">address</v-icon>
                                        </v-flex>
                                        <v-flex xs10 offset-xs1>
                                            <div class="d-block pa-2 font-weight-bold subheading">
                                              {{ profile.office_address}}
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    
                                </v-container>
                                
                                
                            </v-card>
               
        </v-card>
     </v-flex>
</v-layout>
</template>

<script>

import UploadsImage from '@/mixins/UploadsImage'
import HandleRequest from '@/mixins/RequestHandler'
export default {
  data() {
      return {
          _maxWidth: 800,
           _maxHeight: 200,
           _compressionQuality: 0.8,
           profile:{
              profile_img: "",
              phone_number_main:'07059939990',
              phone_number_other:'07059939923',
              company_email:'company@gmail.com',
              office_address:'James Watt Street Benin',
              state:'Edo',
              country:'Nigeria',
              agency_name:'Our Hope Accomodation',
              about_us:'We provide accomodation to young families,We provide accomodation to young families We provide accomodation to young families We provide accomodation to young families We provide accomodation to young families',
              statistics:{
                  no_places: 5,
              }
          }
      }
  },
  watch:{
      imageUrl(val){
           this.upload()
      }

  },
  mixins: [ UploadsImage, HandleRequest ],
  created(){
      this.mixin_handleRequest(this.$store.dispatch('auth/getMyProfile').then(response =>{ 
             this.profile = response.data
         }))
  },

  methods:{
      upload(){

          if(!this.imageBlob)return  false
          let  formData = new FormData()
          formData.append('profile_img',this.imageBlob)
          formData.append('user_id',this.$store.getters['auth/getUser'].id)
         this.mixin_handleRequest(this.$store.dispatch('auth/uploadProfileImage',formData).then(response =>{ 
             this.profile.profile_img = response.data
            //  this.imageUrl = ''
             this.imageBlob = ''
         }))
      }
  }
}
</script>

<style>

</style>
