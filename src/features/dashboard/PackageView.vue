<template>
    <v-card class="pa-2 ma-2">
        <v-card-title primary-title>
            <div class="subheading font-weight-bold py-2"> 
                                    {{plan.package_name}}
            </div>
        </v-card-title>
        <v-card-text>
           <p>
              {{plan.description}}
           </p>
           <p>
               After payment you will be able to upload 2 more places which will expire in
              {{plan.duration_days}} days.
           </p>
           <span> Number of Slots: {{plan.quantity_slot}}</span><br>
           <span> Amount:  N{{plan.price}}</span><br>
           <span> Expiry Date:  {{plan.expires_on}} </span>
        </v-card-text>
        <v-card-actions>
          
        

            <paystack
            :metadata="paystackMetaData"
            :amount="plan.price * 100"
            :email="agentEmail"
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :close="close"
            :embed="false"
        >
        <i class="fas fa-money-bill-alt"></i>
           <v-btn color="red" :loading="loading" :disabled="loading" large outline class="mx-auto" @click="loading = true">PAY N{{plan.price}}</v-btn>
        </paystack>
        </v-card-actions>
    </v-card>
</template>

<script>
import store from './store' 
import paystack from 'vue-paystack';
export default {
components: {
        paystack
    },
 data(){
     return {
         plan:{},
         paystackkey: "pk_test_22bdd340817a7abd23c1ade4fb5f131c60be3e7f", //paystack public key
         loading: false

     }
 },
  computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      },

      paystackMetaData(){

          return {
              "package_id": this.$route.params.planID,
          }
      },

      agentEmail(){
          return this.$store.getters["auth/getUser"].email
      }
    },
 created(){
    this.getPlan(this.$route.params.planID)
 },
 mounted(){
     this.placeOrder()
 },
methods:{
    // placeOrder(){
    //     this.$store.dispatch('dashboard_store/placeOrder',{package_id: this.plan.id,transaction_ref:this.reference})
    // },
    callback: function(response){
        // console.log(response)
        if(response.status == "success")
        {  
            //confirm Payment
            //approve
            this.loading = true
            this.$store.dispatch('dashboard_store/confirmPayment',response.trxref)
            .then((response) =>{
                //reload the user object
                this.$store.dispatch("auth/retrieveUser")
                this.$router.push({name: "MyPlaces", params:{agentSlug: this.$store.getters['auth/getUser'].slug}})
                this.$store.dispatch('common/updateSnackBar',{
                show: true,
                msg: 'Payment Successfull: A receipt has been sent to your Mail',
                color: ''
                })
                
            })
            .catch((error) => {
                // console.log(error.response)
                 if(error.response.status == 409){
                    this.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'Payment was not successful',
                    color: ''
                    })
                    
                 }
                 this.$router.push({name: "ourPackages"})
            })
            .finally(()=> {

                this.loading = false
            })
            

        }else{

                this.$store.dispatch('common/updateSnackBar',{
                show: true,
                msg: 'Unable to Make Transaction',
                color: ''
                })
        
            this.$router.push({ name: "OurPackages"})
        }
        //if succcessful
            //confirm payment
            //give value
            //redirect to myplaces
        //not successful
            //cancel the order
            //go back to the list of packages

      },
      close: function(){
          // console.log("Payment closed")
          //cancel the order
          //go back to list of packages

      },
    getPlan(planID){
        this.$store.dispatch('dashboard_store/retrievePlan',planID)
        .then((response) => {
            this.plan = response.data
        })
    }
}
}
</script>

<style>

</style>
