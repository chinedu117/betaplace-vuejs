<template>
    <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
          <v-container grid-list-xs>
              <v-layout row wrap>
                  <v-flex xs12>
                        <v-card class="pa-2">
                            <v-card-title primary-title>
                            <v-subheader>Forgot Password</v-subheader>
                            </v-card-title>
                                <v-text-field
                                outline
                                name="Email"
                                label="Enter your email"
                                id="email"
                                :error-messages="serverErrors.email ? serverErrors.email : errors.collect('email')"
                                v-validate="'required|email'"
                                data-vv-name="email"
                                v-model="email"
                                required
                                ></v-text-field>

                                <v-card-actions>
                                    <v-btn color="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
                                </v-card-actions>
                        </v-card>
                  </v-flex>
              </v-layout>
          </v-container>
         </v-flex>
    </v-layout>
</template>

<script>
import HandlesRequest from '@/mixins/RequestHandler'
export default {
    data(){
        return{
            email: '',
        }
    },
  mixins: [ HandlesRequest],
  methods:{
     submit(){
         this.$validator.validate().then(result => {
        			if (result) {
						this.mixin_handleRequest(this._submit())
       				 }
      			})
         
     },

     _submit(){
         let formData = new FormData()
         formData.append('email',this.email)
         return this.$store.dispatch("auth/forgotPassword",formData)
             .then(response => {
                 this.$store.dispatch('common/updateSnackBar',{
                 show: true,
                 msg: response.data.message,
                 color: ''
                 })
                 
             })
     }
  },
}
</script>

<style>

</style>
