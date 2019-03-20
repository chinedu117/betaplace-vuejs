
import axios from 'axios'
import store from '@/store'
import * as API from '@/api'


store.registerModule('place_view_store', {
  namespaced: true,

  // State loaded when this component is first loaded.
  state: {
    place:{},
    agent_info:null
  },

  getters: {

    place(state) {

        return state.place
    },
    agentInfo(state){
      return state.agent_info
    }
  },

  mutations:{
    addPlace(state,place){
        state.place = place
         
    }, 
    addAgentInfo(state,agent){
        state.agent_info = agent
    }
  },

  actions:{

    retrievePlace({commit},placeSlug){
       
      axios.defaults.withCredentials = true //allow it to also send and r eceive cookies

      return new Promise( (resolve,reject) =>{
          // console.log(API.PLACE_URL(placeSlug))
          axios.get(API.PLACE_URL(placeSlug))
          .then(function (response) {
                      
                    store.commit('places_list_store/updateUserPreferences',response.data)//{root: true})
                     commit('addPlace',response.data)
                     store.dispatch('places_list_store/retrieveByPreferences')
                    
                     
                  resolve(response)
              })
          .catch(function (error) {
              //  console.log(error)
                   reject(error)
          });


      })

    },

    retrieveAgentInfo({commit},agentSlug){

        return new Promise( (resolve,reject) =>{
          // console.log(API.PLACE_URL(placeSlug))
          axios.get(API.AGENT_PUBLIC_INFO_URL(agentSlug))
          .then(function (response) {
                      
                  commit("addAgentInfo",response.data)
                  
                  resolve(response)
              })
          .catch(function (error) {
              //  console.log(error)
                   reject(error)
          });


      })
    }

  },

})