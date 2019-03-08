<template>
    <v-card>
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
           <v-btn color="red" large outline class="mx-auto">PAY {{plan.price}}</v-btn>
        </v-card-actions>

            <paystack
            
            :amount="amount"
            :email="email"
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :close="close"
            :embed="false"
        >
        <i class="fas fa-money-bill-alt"></i>
        Make Payment
        </paystack>
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
         paystackkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxx", //paystack public key
          email: "foobar@example.com", // Customer email
          amount: 1000000 // in kobo

     }
 },
  computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    },
 created(){
    this.getPlan(this.$route.params.planID)
 },
methods:{
    callback: function(response){
        console.log(response)
      },
      close: function(){
          console.log("Payment closed")
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
