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
      
    retrievePlans({commit}){
       
        // if(state.planList.lenght < 1){
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
        // }
        
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
    
  },

})