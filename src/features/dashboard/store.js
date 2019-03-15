import store from '@/store'
import Vue from 'vue'
import * as API from '@/api'


store.registerModule('dashboard_store', {
  namespaced: true,

  // State loaded when this component is first loaded.
  state: {
   planList: [],

  },

  getters: {

   planList(state){
       return state.planList
   }

  },

  mutations:{
    addPlan(state,plan){
        state.planList.push(plan)
    }
    
  },

  actions:{
    
    retrieveMySubscriptions({commit}){
       
        return new Promise( (resolve,reject) =>{

            Vue.http.get(API.MY_SUBSCRIPTIONS_URL)
             .then(function (response) {
                     resolve(response)
                 })
             .catch(function (error) {
                 //  console.log(error)
                      reject(error)
             });
 
 
         })

    },
    confirmPayment({commit},transactionRef){

        return new Promise( (resolve,reject) =>{

            Vue.http.post(API.PAYSTACK_CONFIRM_URL,{transaction_ref: transactionRef})
             .then(function (response) {
                     resolve(response)
                 })
             .catch(function (error) {
                 //  console.log(error)
                      reject(error)
             });
 
 
         })

    },
    cancelOrder({commit}){

    },
    retrievePlans({commit,state}){
       
        if(state.planList.length < 1){
            return new Promise( (resolve,reject) =>{
                Vue.http.get(API.PACKAGES_URL)
                 .then(function (response) {
                  
                    response.data.forEach((planItem) => {
                            commit('addPlan',planItem)
                         })
                         
                         resolve(response)
                     })
                   
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 });
     
     
             })
        }
        
    },

    retrievePlan({commit},planID){
       
        // if(state.planList.lenght < 1){
            return new Promise( (resolve,reject) =>{
                Vue.http.get(API.PACKAGE_URL(planID))
                 .then(function (response) {
                         resolve(response)
                     })
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 });
     
     
             })
        // }
        
    },

     publishPlace({commit},payload){
       
        // if(state.planList.lenght < 1){
            return new Promise( (resolve,reject) =>{
                Vue.http.post(API.DASHBORD_PLACE_EXPLICIT_PUBLISH_URL(payload.place_slug))
                 .then(function (response) {
                         resolve(response)
                     })
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 });
     
     
             })
        // }
        
    },

    unpublishPlace({commit},payload){
       
        // if(state.planList.lenght < 1){
            return new Promise( (resolve,reject) =>{
                Vue.http.post(API.DASHBORD_PLACE_EXPLICIT_UNPUBLISH_URL(payload.place_slug))
                 .then(function (response) {
                         resolve(response)
                     })
                 
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 });
     
     
             })
        // }
        
    },
    
  },

})