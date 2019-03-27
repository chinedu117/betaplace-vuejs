<template>
     <v-layout row>
         <v-flex  xs12>
                
                <div  class="pricing-wrapper clearfix" >
                 
                  <div class="pricing-table" >
                       <h3 class="pricing-title">{{plan.package_name}}</h3>
                       <div class="price">N {{plan.price}}</div>
                       <!-- Lista de Caracteristicas / Propiedades -->
                <ul class="table-list">

                    <li>{{plan.quantity_slot}}  <span>Slots</span></li>
                    <li>{{plan.duration_days}} days <span>Duration</span></li>
                    <li>Expires on <span> {{plan.expires_on }}</span></li>
                    
                </ul>
                <!-- Contratar / Comprar -->
                <div class="table-buy">
                  <p>N {{plan.price}}</p>
                   
                   <div class="pricing-action">
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
                         <v-btn class="btn-color-action" :loading="loading" flat :disabled="loading"  @click="loading = true">BUY</v-btn>
                      </paystack>
                  </div>
                </div>
              </div>
                  </div>
                
          </v-flex> <!-- End template for mobile display -->
         
      </v-layout>  
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
         paystackkey: process.env.PAYSTACK_PUBLIC_KEY, //paystack public key
         loading: false

     }
 },
  computed: {
      reference(){
        let text = "";
        let t = new Date()
            t = "_"+t.getTime()
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text.concat(t)
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

<style scoped>
 * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    background: #2e2a2a;
    color: #FFF;
    font-size: 62.5%;
    font-family: 'Roboto', Arial, Helvetica, Sans-serif, Verdana;
}

ul {
    list-style-type: none;
}

a {
    color: #e95846;
    text-decoration: none;
}

.pricing-table-title {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 2.6em;
    color: #FFF;
    margin-top: 15px;
    text-align: left;
    margin-bottom: 25px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.pricing-table-title a {
    font-size: 0.6em;
}
 
.clearfix:after {
    content: '';
    display: block;
    height: 0;
    width: 0;
    clear: both;
}
/** ========================
 * Contenedor
 ============================*/
.pricing-wrapper {
    width: 960px;
    margin: 40px auto 0;
}

.pricing-table {
    margin: 0 auto;
    text-align: center;
    width: 500px;
    -webkit-box-shadow: 0 0 15px rgba(0,0,0,0.4);
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
}

.pricing-table:hover {
    -webkit-transform: scale(1.06);
    -ms-transform: scale(1.06);
    -o-transform: scale(1.06);
    transform: scale(1.06);
}

.pricing-title {
    color: #FFF;
    background: #e95846;
    padding: 20px 0;
    font-size: 2em;
    text-transform: uppercase;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.pricing-table.recommended .pricing-title {
    background: #2db3cb;
}

.pricing-table.recommended .pricing-action {
    background: #2db3cb;
}

.pricing-table .price {
    background: #403e3d;
    font-size: 3.4em;
    font-weight: 700;
    padding: 20px 0;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    color:#fcf7f7e6;
}


.pricing-table .price sup {
    font-size: 0.4em;
    position: relative;
    left: 5px;
}

.table-list {
    background: #FFF;
    color: #403d3a;
}

.table-list li {
    font-size: 1.4em;
    font-weight: 700;
    padding: 12px 8px;
}

.table-list li:before {
    content: "\e5ca";
    font-family: 'Material Icons';
    color: #3fab91;
    display: inline-block;
    position: relative;
    right: 5px;
    font-size: 16px;
} 

.table-list li span {
    font-weight: 400;
}

.table-list li span.unlimited {
    color: #FFF;
    background: #e95846;
    font-size: 0.9em;
    padding: 5px 7px;
    display: inline-block;
    -webkit-border-radius: 38px;
    -moz-border-radius: 38px;
    border-radius: 38px;
}


.table-list li:nth-child(2n) {
    background: #F0F0F0;
}

.table-buy {
    background: #FFF;
    padding: 15px;
    text-align: left;
    overflow: hidden;
}

.table-buy p {
    float: left;
    color: #37353a;
    font-weight: 700;
    font-size: 2.4em;
}

.table-buy p sup {
    font-size: 0.5em;
    position: relative;
    left: 5px;
}

.table-buy .pricing-action {
    float: right;
    color: #FFF;
    background: #e95846;
    padding: 10px 16px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-weight: 700;
    font-size: 1.4em;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
}
 .btn-color-action{
    font-weight: 700;
    font-size: 1.4em;
    color: #FFF;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
 }
.table-buy .pricing-action:hover {
    background: #cf4f3e;
}

.recommended .table-buy .pricing-action:hover {
    background: #228799;    
}

/** ================
 * Responsive
 ===================*/
 @media only screen and (min-width: 768px) and (max-width: 959px) {
    .pricing-wrapper {
        width: 768px;
    }

    .pricing-table {
        width: 236px;
    }
    
    .table-list li {
        font-size: 1.3em;
    }

 }

 @media only screen and (max-width: 767px) {
    .pricing-wrapper {
        width: 420px;
    }

    .pricing-table {
        display: block;
        float: none;
        margin: 0 0 20px 0;
        width: 100%;
    }
 }

@media only screen and (max-width: 479px) {
    .pricing-wrapper {
        width: 300px;
    }
} 
</style>
