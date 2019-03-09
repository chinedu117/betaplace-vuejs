<template>
    <div> 
      <v-layout row v-if="$vuetify.breakpoint.smAndDown">
         <v-flex  xs12>
         
                 <div class="d-flex justify-space-between">
                    <v-subheader>Plans <v-chip >{{plans.length}}</v-chip></v-subheader>
                    
                </div>

                <template 
                  v-for="(subscription,index) in plans"
                  
                  >
                  <div 
                  :index="index"
                  :key="subscription.id"
                  >
               

                 <v-card  style="border-left: red solid thick" class="pa-2 mb-1">
                     <div class="subheading font-weight-bold py-2"> 
                                    {{subscription.package_name}}
                      </div>
                      <v-layout row wrap justify-end>
                          <v-flex xs6>
                              <div>
                                  <span>Duration: {{subscription.duration_days}}  days</span><br>
                                  <span>Slots: {{subscription.quantity_slot}}</span><br>
                                  <span class="red--text">Price : N {{subscription.price}}</span>
                              </div>
                          </v-flex>
                          <v-flex xs6 align-end>
                              <v-btn color="success" outline @click="viewPlan(subscription.id)">ORDER</v-btn>
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
import store from './store' 
import HandlesRequest from "@/mixins/RequestHandler"
export default { 
    data(){
        return {
            subscriptionList: []
        }
    },
    computed:{
        plans(){
            // return this.subscriptionList
            return this.$store.getters["dashboard_store/planList"]
        }
    },
    mixins: [ HandlesRequest ],
    created(){

        this.loadPlans()
    },
    methods:{
        loadPlans(){
            //load packages
            
             this.mixin_handleRequest(this.$store.dispatch("dashboard_store/retrievePlans"))
        },

        viewPlan(planID){
         
            this.$router.push({name: 'PackageView', params:{planID}})

        }
    }
}
</script>

<style>

</style>
