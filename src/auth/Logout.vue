<template>
</template>
<script>

	
	export default {
	
      name: 'logout',
      created() {

          this.logout()
      },
      methods: {

	  	logout() {

              this.$store.dispatch('auth/logout')
              .then(response => {
                   
                   this.$router.push({ name: 'Login'})
                   this.$store.dispatch('common/updateSnackBar',{
                        msg: 'You are logged out!',
                        color: 'red',
                        show: true
                        })
                  
               
        
              })
              .catch(error => {
                  this.$router.push({ name: 'Login'})
                //   this.$store.dispatch('common/updateSnackBar',{
                //                                    msg: 'Unable to Log out',
                //                                    color: 'red',
                //                                    show: true
                //                     })
               //  console.log(error)                                    
                
              })
               
	  	}
	  }
	}
	</script>
	
<style scoped>
</style>