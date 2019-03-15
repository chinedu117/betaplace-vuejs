<template>
    <div> 
      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
         <v-flex  xs12>
         
                 <div class="d-flex justify-space-between">
                    <v-subheader>
                        My Subscriptions <v-chip >{{subscriptions.length}}</v-chip>
                    </v-subheader>
                </div>

                <template 
                  v-for="(subscription,index) in subscriptions"
                  
                  >
                  <div 
                  :index="index"
                  :key="subscription.id"
                  >
               

                 <v-card  :style="subscription.expired == 1 ? 'border-left: red solid thick' : 'border-left: green solid thick' " class="pa-2 mb-1">
                     <div class="subheading font-weight-bold py-2"> 
                                    {{subscription.package.package_name}}
                      </div>
                      
                      <v-layout row wrap justify-end>
                          <v-flex xs6>
                              <div>
                                  <span>Duration: {{subscription.package.duration_days}} days</span><br>
                                  <span>Slots given: {{subscription.package.quatity_slot}}</span><br>
                                  <span class="red--text">Amount Paid: N{{subscription.amount}}</span><br>
                                  <span class="red--text">Subscribed on: {{subscription.created_at}}</span><br>
                                  <span class="red--text">Expired on: {{subscription.expiry_date}}</span>
                              </div>
                          </v-flex>
                          <v-flex xs6 align-end>

                              <v-chip color="red" v-if="subscription.expired == 1">Expired</v-chip>
                              <v-chip color="green" v-else>active</v-chip>
                          </v-flex>
                          
                      </v-layout>
                  </v-card>
                  
                  </div>
                </template>
                
          </v-flex> <!-- End template for mobile display -->
         
      </v-layout>
 
</div>

</template>

<script>
import HandlesRequest from "@/mixins/RequestHandler"
export default {
data(){
    return {
        subscriptionList: []
    }
},
created(){
    this.getSubscriptions()
},
computed: {

    subscriptions(){
        return this.subscriptionList
    }
},
mixins: [ HandlesRequest ],
methods:{

    getSubscriptions(){

        this.mixin_handleRequest(this.$store.dispatch("dashboard_store/retrieveMySubscriptions")
        .then((response) =>{
            this.subscriptionList = response.data
        }))
    }
}
}
</script>

<style>

</style>
