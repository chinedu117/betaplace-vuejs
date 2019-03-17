// import axios from 'axios'
import store from '@/store'
import * as API from '@/api'
import haversine from 'haversine'
import Vue from 'vue'

store.registerModule('places_list_store', {
  namespaced: true,

  // State loaded when this component is first loaded.
  state: {
    userPreferences: {
        visited: localStorage.getItem('visited') || null,
        pref_state: localStorage.getItem('pref_state') || null,
        pref_cords: localStorage.getItem('pref_cords') || null,
        pref_price: localStorage.getItem('pref_price') || null
    },
    list_mode: 'all', // can be filter mode, search mode
    filter_box:{
        show: false,
        filtered:[] //stores items filtered in the filter mode
    },
    search: {
        show: false,
        searchText: '',
        found:[] //stores items found in the search mode
    },
    nextPageUrl: null,
    preferredFilters: {},
    filterValue:'',
    filterType:'none',
    places: [], //hold places in the all mode
    loaded:false,
    userCoordinates:null,
  },

 getters: {
     
     nextPageUrl(state){
        return state.nextPageUrl
     },
     userPreferences(state)
     {
        return  state.userPreferences
     },
     hasUserCoords(state){
       if(state.userCoordinates !== null){
            return true
       }else{
            return false
       }
     },
     hasLoadedPLaces(state)
     {
       return state.loaded
     },
     placesFiltered(state) {

        const mode = state.list_mode
        const userCoords = state.userCoordinates !== null ? true : false

        if( mode == 'all'){

          return state.places

        }else if(mode == 'search'){
           
           if(userCoords){
                  //
                  return state.filter_box.filtered.sort(function (first, second) {
                     return first.distance - second.distance
                  })
              }

          return state.search.found
          
        }else if(mode == 'filter'){
             //sort by distance
              if(userCoords){
                  //
                  return state.filter_box.filtered.sort(function (first, second) {
                     return first.distance - second.distance
                  })
              }
             return state.filter_box.filtered

        }else{

          return state.places
          // return .getters['places_list_store/placesFiltered']
        }
        //  if (state.filterType == 'none') {

        //      return state.places

        //  } else if (state.filterType == 'budget') {

        //      // console.log(state.filterType)
        //      // return state.places

        //      const maxBudget = Number(state.filterValue)

        //      return state.places.filter(place => Number(place.price) <= maxBudget)
        //  } else if (state.filterType == 'distance') {

        //      return state.places.sort(function (first, second) {
        //          return first.distance - second.distance
        //      })
        //  } else if(state.filterType == 'search'){

        //     return state.places.filter(place => {
        //         return place.location.toLowerCase().includes(state.filterValue)
        //     })
            
        //  }


     },

  },

  mutations: {
    updateNextPage(state,Url){
        state.nextPageUrl = Url
    },
    updateUserPreferences(state,place){
    
        localStorage.setItem("visited",place.id)
        localStorage.setItem("pref_price",place.price)
        localStorage.setItem("pref_state",place.state)
        localStorage.setItem('pref_cords',JSON.stringify([place.latitude,place.longitude]))
        localStorage.setItem('pref_category',place.place_category_id)
        localStorage.setItem('pref_location',place.location)

        state.userPreferences = Object.assign({},state.userPreferences,{ 
            visited: localStorage.getItem('visited') || null,
            pref_state: localStorage.getItem('pref_state') || null,
            pref_cords: localStorage.getItem('pref_cords') || null,
            pref_price: localStorage.getItem('pref_price') || null,
            pref_category: localStorage.getItem('pref_category') || null,
            pref_location: localStorage.getItem('pref_location') || null
        })
    },

    updateUserCoords(state,Coords){
        localStorage.setItem('user_coords',JSON.stringify([Coords.latitude,Coords.longitude]))

         state.userCoordinates = Object.assign({},state.userCoordinates,{ 
          
            user_coords: localStorage.getItem('user_coords') || null,
           
        })

    },

    hasLoadedPlaces(state,val){
         state.loaded = val
    },
    changeMode(state,newMode = 'all'){
        state.list_mode = newMode
    },
    // addSearchFound(state,foundItems)
    // {
    //     state.search.found.concat(foundItems)
    // },
    addPlacePrefered(state,place)
    {   
        //add to the top
       //loaded based on preference
       place.prefered = true
       state.places.unshift(place)
    },
     addPlace(state,place)
     {  
        
        state.places.push(place)
     },

      addPreferredFilters(state, filterObj) {
        //   state.preferredFilters.push(filterObj)
        state.preferredFilters = Object.assign({},state.preferredFilters,filterObj)
          // TODO : store in local storage so we can use in subsequent requests
      },

      updateSearchBox(state, payload) {
          state.search = Object.assign({}, state.search, payload)
      },
      updateFilterBox(state, payload) {
        state.filter_box = Object.assign({}, state.filter_box, payload)
      },

      updateDistance(state, myLocation) {

          state.places.forEach(place => {

              place.distance = haversine(myLocation, {
                  latitude: place.latitude,
                  longitude: place.longitude
              }, { 'unit': 'kilometer' })

          })
      },
  
  },

  actions: {
    clearFilters({state}){
         state.preferredFilters = {}
    },
    filterList({state,commit}){
        
        commit('changeMode','filter')
       if(!Object.keys(state.preferredFilters).length) return //empty

        //add check user cords add
      let FILTER_URL = API.PLACES_FILTER_URL
         if(state.userCoordinates.user_coords !== null){
             let Query = '?user_coords='+ state.userCoordinates.user_coords
            FILTER_URL = FILTER_URL.concat(Query)
         }

        return new Promise( (resolve,reject) =>{
            Vue.http.get(FILTER_URL,{params:state.preferredFilters})
            .then(function (response) {

                    commit("updateFilterBox",{show:true,filtered:response.data})
                    resolve(response)
                })
            .catch(function (error) {
                //  console.log(error)
                     reject(error)
            });


        })
    },
    
    retrievePlaces({commit,getters})
    {

        Vue.http.defaults.withCredentials = true //allow it to also send and r eceive cookies
        if(!getters.hasLoadedPLaces)
        {
            return new Promise( (resolve,reject) =>{
               Vue.http.get(API.PLACES_URL)
                .then(function (response) {
                 commit('updateNextPage',response.data.next_page_url)
                   response.data.data.forEach((place) => {
                           commit('addPlace',place)
                        })
                        commit("hasLoadedPlaces",true)
                        resolve(response)
                    })
                  
                
                .catch(function (error) {
                    //  console.log(error)
                         reject(error)
                });
    
    
            })
        }
        
    },

    retrieveByPreferences({commit,getters}){
        //use preferences to fetch others
        let Query =  ''
        //if he has vivstied a place, use the preference
         if(getters.userPreferences.visited !== null){
            
            // commit('updateUserPreferences')
            const preferred = getters.userPreferences
             Query = "?pref_price=" + preferred.pref_price 
                   + "&pref_cords=" + preferred.pref_cords
                    + "&pref_state=" + preferred.pref_state
                    + "&pref_category=" + preferred.pref_category
                    + "&pref_location=" + preferred.pref_location
                    + "&exclude="+ preferred.visited
                    
                    // console.log(API.PLACES_URL.concat(Query))
                    return new Promise( (resolve,reject) =>{
                        Vue.http.get(API.PLACES_URL.concat(Query))
                         .then(function (response) {
                             
                            response.data.forEach((place) => {
                                    commit('addPlacePrefered',place)
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

    retrieveNextPage({commit,getters}){
        //check if there is next page url in storage
        //load it
        //save next page url in the storage
        //use preferences to fetch others
         if(getters.nextPageUrl !== null){
            return new Promise( (resolve,reject) =>{
                Vue.http.get(getters.nextPageUrl)
                 .then(function (response) {
                    
                    commit('updateNextPage',response.data.next_page_url)
                    response.data.data.forEach((place) => {
                            commit('addPlace',place)
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
    // updateUserPreferences({commit}){
    //     commit('updateUserPreferences')
    // },
    search({commit},searchText)
    { 
        commit("addPreferredFilters",{filter_search: searchText})
        
        Vue.http.defaults.withCredentials = true

         let SEARCH_URL = API.PLACES_SEARCH_URL
         if(state.userCoordinates.user_coords !== null){
             let Query = '?user_coords='+ state.userCoordinates.user_coords
            SEARCH_URL = SEARCH_URL.concat(Query)
         }

        return new Promise( (resolve,reject) =>{
            Vue.http.get(SEARCH_URL,{params:{search:searchText}})
            .then(function (response) {

            
                    commit('updateSearchBox',{found:response.data,show:true})
                    commit('changeMode','search')
                    
                    resolve(response)
                })
            .catch(function (error) {
                //  console.log(error)
                     reject(error)
            });

  
        })
        
        

    },

    clearSearch({commit}){

        commit("updateSearchBox",{show:false,found:[],searchText:""})
        commit('changeMode','all')
        
    },
    
    updateDistance({commit},myLocation)
    {
        commit('updateDistance',myLocation)
        commit('addPreferredFilters',{filter_distance: true})
        
    }
    
  }
})
