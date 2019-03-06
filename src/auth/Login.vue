<template>
 <v-container grid-list-md text-xs-center class="page-wrapper">
 	<v-layout row wrap>
 	   <v-flex xs12>
	 		<v-card>
			 		<v-toolbar flat>
			 			<v-toolbar-side-icon/>
			 			<v-toolbar-title>
			 				Login
			 		    </v-toolbar-title>
			        </v-toolbar>
		            <v-flex xs12 px-4>
						<v-text-field 
						  label="Email"
						  v-model="credentials.username"
				          ripple
						  :error-messages="serverErrors.email ? serverErrors.email : errors.collect('email')"
                           v-validate="'required|email'"
                           data-vv-name="email"
						 />
					 </v-flex>
						
				       
				      <v-flex xs12 px-4>
						<v-text-field
						  label="Password"
						  v-model="credentials.password"
						  type="password"
						  :error-messages="serverErrors.password ? serverErrors.password : errors.collect('password')"
                          v-validate="'required'"
                          data-vv-name="password"
						/>
				       </v-flex>

				       <v-flex xs12 px-4>
						   
				       	   <v-btn 
							  :loading="loading"
							  :disabled="loading"
							  @click="login"> Login</v-btn>
				       </v-flex>
 

				  
		    </v-card>
		</v-flex>
   </v-layout>
</v-container>
</template>



<script>
	
	import HandleRequest from '@/mixins/RequestHandler.js'
	export default {
	
	  name: 'login',
	
	  data () {
	    return {
	    	credentials: { 
							username: '',
	    	               password: ''
						},
	    }
		},
        mixins: [ HandleRequest],
		
	    methods: {

	  	login() {
			this.mixin_handleRequest(this.$store.dispatch('auth/login',this.credentials)
			.then(response => {
					console.log('Login Successfull')
					this.mixin_handleRequest(this.$store.dispatch('auth/retrieveUser')
					.then(response => {
						this.redirectAfterLogin()

					})
					)
			})
			)
				
				
		  },
		redirectAfterLogin(){
			if(this.$store.getters['auth/userEmailVerified']){ 
				   if(this.$store.getters['auth/userHasProfile']){ 
						const slug = this.$store.getters['auth/getUser'].slug
						this.$router.push({ name: 'MyPlaces', params: {agentSlug: slug}})
					}else{
                        this.$router.push({ name: 'AgentProfile'})
					}
				}else{
					alert('You did not verify your email address')
				}
		}
	  }
	}
	</script>
	
<style scoped>

  .container {
  	 max-width: 500px;

  }
	
	 .success-alert {
		 
		  padding: 15px 10px;
			 margin: 20px 10px;
			 border: 1px solid #36854ec7;
			 background: #61a57b5d;
			 border-radius: 10px;
			 display: block;
			 text-align: left;
			 font-size: 16px;
	 }

</style>