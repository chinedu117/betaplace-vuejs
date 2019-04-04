<template>
 <v-container grid-list-md text-xs-center class="page-wrapper">
  <v-layout row wrap>
     <v-flex xs12>

        <agent-info
         :agent_slug="agentSlug"
         :image_src="imageUrl ? imageUrl : profile.profile_img"
         :show_body="false"
         >
           <template slot="uploader">
               <v-progress-linear :indeterminate="true" v-if="loading" class="mt-0"></v-progress-linear>

                    <v-btn fab dark @click='pickFile'  v-bind="upload_button"   color="primary">
                        <v-icon dark>camera</v-icon>
                    </v-btn>
                        <input
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                            >
                   <v-btn fab dark @click='editProfile'  v-bind="edit_button"   color="accent">
                        <v-icon dark>edit</v-icon>
                    </v-btn>
           </template>
        </agent-info>
      </v-flex>
          
    </v-layout>
  </v-container>
</template>

<script>

import UploadsImage from '@/mixins/UploadsImage'
import HandleRequest from '@/mixins/RequestHandler'
import AgentInfo from '@/features/places_list/components/AgentInfo'
export default {
  data() {
      return {
           in_maxWidth: "700",
           in_maxHeight: "500",
           in_compressionQuality: "0.8",
           profile: null,
      }
  },
  components:{ AgentInfo },
  computed: {
         card_style(){

           if(!this.$vuetify.breakpoint.smAndDown){
             return {
              "width": "100%",
              "class": "mx-auto pa-2",
             }
           }else{
             return {
              "class": "mx-auto px-2",
               }
           }
         },
         upload_button(){
           if(!this.$vuetify.breakpoint.smAndDown){
             return {
           
              
              "style":"position: absolute; "
             }
           }else{

             return {
            
              "style":"position: relative; right: 40%; bottom:10% "

               }
           }
               
         },
         edit_button(){
           if(!this.$vuetify.breakpoint.smAndDown){
             return {
           
              
              "style":"position: absolute; left: 90%; top:80% "
             }
           }else{

             return {
            
              "style":"position: absolute; right: 40%; bottom:10% "

               }
           }
               
         },
         agentSlug(){
              return this.$store.getters['auth/getUser'].slug
         },

         
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
      },
      editProfile(){

         let slug = this.$store.getters['auth/getUser'].slug
                   this.$router.push({name: 'AgentProfile', params: { agentSlug: slug }})
      }
  }
}
</script>

<style>

</style>
