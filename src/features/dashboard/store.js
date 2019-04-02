// import store from '@/store'
import * as API from '@/api'
import Vue from 'vue'

export default {
  namespaced: true,
  // State loaded when this component is first loaded.
  state: {
   planList: [],
   places: [],
   subscriptions:[],
   hasLoadedSubscriptions: false,
   hasLoadedPlans: false,
   hasLoadedPlaces: false,
  },

  getters: {

   planList(state){
       return state.planList
   },

   places(state){
     return state.places
   },

   subscriptions(state){
     return state.subscriptions
   },

   summary(state,getters,rootState,rootGetters){
      const user = rootGetters['auth/getUser']
     
      let  slotRemaining = user.agent_statistics.max_no_places
      return {
         'places_no': state.places.length,
         'subscriptions_no': state.subscriptions.length,
         'slots_remaining': slotRemaining

      }
   }



  },

  mutations:{
    addPlan(state,plan){
        // state.planList.push.call(plans)
       state.planList.push(plan)

    },
    addSubscription(state,subscription){
        // state.subscriptions.push.call(subscriptions)
        state.subscriptions.push(subscription)
    },
    addPlace(state,place){
        // state.places.push.call(places)
         
       state.places.push(place)
    },

    reset(state,option){
         switch(option){

             case "SUBSCRIPTION":
                state.hasLoadedSubscriptions = false
                break
             case "PLACES":
                state.hasLoadedPlaces = false
                break
            case "PLANS":
               state.hasLoadedPlans= false
            break
            
            default:
               state.hasLoadedPlans= false
               state.hasLoadedPlaces = false
               state.hasLoadedSubscriptions = false
               break
         }
    }
    
  },

actions:{
    
    retrieveMySubscriptions({commit,state}){
        if(!state.hasLoadedSubscriptions){
            return new Promise( (resolve,reject) =>{
     
                Vue.http.get(API.MY_SUBSCRIPTIONS_URL)
                 .then(function (response) {

                         response.data.forEach((subscription) =>{
                           commit("addSubscription",subscription)
                           
                       })
                         state.hasLoadedSubscriptions = true
                         resolve(response)
                     })
                 .catch(function (error) {
                     //  console.log(error)
                          reject(error)
                 })
     
     
             })
        }

    },
    retrieveAgentPlacesList({commit,state},payload) {
         if(!state.hasLoadedPlaces){
            return new Promise((resolve,reject) =>{
                  Vue.http.get(API.AGENT_PLACES_URL,{params:payload})
                      .then(response => {

                        response.data.forEach((place) =>{
                           commit("addPlace",place)
                       })
                        state.hasLoadedPlaces = true
                        resolve(response)
                        
                      })
                    .catch((error) => {

                        reject(error)
                    })
            })
        }
   }, 
    //Payment
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
       
        if(!state.hasLoadedPlans){
            return new Promise( (resolve,reject) =>{
                Vue.http.get(API.PACKAGES_URL)
                 .then(function (response) {
                       
                       response.data.forEach((plan) =>{
                           commit("addPlan",plan)

                       })
                       state.hasLoadedPlans = true
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
    //PLACE ACTIONS
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
                 })
     
     
             })
        // }
        
    },

    renewPlace({commit},payload){
          return new Promise((resolve,reject) =>{
               Vue.http.post(API.DASHBOARD_PLACE_RENEW_URL(payload.place_slug))
                  .then(response => {
                      
                      resolve(response)
                  })
                  .catch((error) => {

                     reject(error)
                  })
          })
    }

    
  }


}