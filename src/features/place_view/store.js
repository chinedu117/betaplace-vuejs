
import axios from 'axios'
import store from '@/store'
import * as API from '@/api'

function placeFromCache(state,slug){
       let index = state.place_cache.findIndex((place) =>{
             return place.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.place_cache[index]

          }
  
}

function agentFromCache(state,slug){
       let index = state.agents_cache.findIndex((agent) =>{
             return agent.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.agents_cache[index]

          }
  
}

store.registerModule('place_view_store', {
  namespaced: true,

  // State loaded when this component is first loaded.
  state: {
    place:{},
    agent_info:null,
    agents_cache:[],
    place_cache:[],
  },

  getters: {

    place(state) {

        return state.place
    },
    agentInfo(state){
      return state.agent_info
    },

    placeFromCache(state,slug){
             let index = state.place_cache.findIndex((place) =>{
             return place.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.place_cache[index]

          }
    }

  
  },

  mutations:{
    addPlace(state,place){
        state.place = place
         
        state.place_cache.push(place)
    }, 
    addAgentInfo(state,agent){

        state.agent_info = agent
        state.agents_cache.push(agent)
    }
  },

  actions:{

    retrievePlaceFromCache({state},slug){

           let index = state.place_cache.findIndex((place) =>{
             return place.slug  == slug
        })
          // alert(index)
          if(index == '-1'){
            // alert(false)
            return false
          }else{
            return state.place_cache[index]

          }

    },

    retrievePlace({commit,state},placeSlug){
       
     //allow it to also send and r eceive cookies
        
        var fromCache = placeFromCache(state,placeSlug)
      

        if(fromCache !== false){
          
               return fromCache

        } else{


            axios.defaults.withCredentials = true
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


        }//elseif
       
      

    },

    retrieveAgentInfo({commit,state},agentSlug){
         //allow it to also send and r eceive cookies
        
        var fromCache = agentFromCache(state,agentSlug)
        // console.log(fromCache)

        if(fromCache !== false){
               

               return fromCache

        } else{

        

              return new Promise( (resolve,reject) =>{
                // console.log(API.PLACE_URL(placeSlug))
                axios.get(API.AGENT_PUBLIC_INFO_URL(agentSlug))
                .then(function (response) {
                            
                            response.data.slug = agentSlug
                          commit("addAgentInfo",response.data)
                         // console.log(response.data)
                        resolve(response)
                    })
                .catch(function (error) {
                    //  console.log(error)
                         reject(error)
                });


            })
        }//else end
    },

    clearCache({state}){
          state.place_cache = []
          state.agents_cache = []
    }

  },

})