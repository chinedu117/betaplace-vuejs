import Vue from 'vue'
// import auth from '@/auth/helpers'
import * as API from '@/api'

export default class Service {
  constructor () {
    
  }
  removeImage(payload){

    return Vue.http.post(API.DASHBORD_PLACE_IMAGE_REMOVE_URL(payload.get('place_slug')),payload)
              .then(response => {

                return new Promise((resolve) => { resolve(response) })
            })
            .catch((error) => {

              return new Promise((resolve, reject) => { reject(error) })
            })
  }
  saveImage(placeSlug,payload){

    return Vue.http.post(API.DASHBORD_PLACE_IMAGE_SAVE_URL(placeSlug),payload)
              .then(response => {

                return new Promise((resolve) => { resolve(response) })
            })
            .catch((error) => {

              return new Promise((resolve, reject) => { reject(error) })
            })
  }

   //api call to create a place
   saveFeatures(payload){

    return Vue.http.post(API.DASHBORD_PLACE_FEATURE_SAVE_URL(payload.place_slug),payload)
              .then(response => {

                return new Promise((resolve) => { resolve(response) })
            })
            .catch((error) => {

              return new Promise((resolve, reject) => { reject(error) })
            })
  }

  //api call to create a place
  savePlace(payload,editingMode){
    let url = ''
    if(editingMode)
    {
       url = API.DASHBORD_PLACE_EDIT_URL(payload.slug)
    }else{
       url = API.DASHBORD_PLACE_CREATE_URL
    }
    return Vue.http.post(url,payload)
              .then(response => {

                return new Promise((resolve) => { resolve(response) })
            })
            .catch((error) => {

              return new Promise((resolve, reject) => { reject(error) })
            })
  }
  
    getCategoryList() {
        return Vue.http.get(API.PLACE_CATEGORY_LIST_URL)
            .then(response => {

                return new Promise((resolve) => { resolve(response) })
            })
            .catch((error) => {

                return new Promise((resolve, reject) => { reject(error) })
            })
     
  }

   getAgentPlacesList(payload) {
    return Vue.http.get(API.AGENT_PLACES_URL,{params:payload})
        .then(response => {
            return new Promise((resolve) => { resolve(response) })
        })
        .catch((error) => {

            return new Promise((resolve, reject) => { reject(error) })
        })
 
}

deletePlace(payload){
  return Vue.http.post(API.AGENT_PLACE_DELETE_URL(payload.place_slug))
  .then(response => {
      return new Promise((resolve) => { resolve(response) })
  })
  .catch((error) => {

      return new Promise((resolve, reject) => { reject(error) })
  })
}
  
publishPlaceToggle(payload){
  return Vue.http.post(API.DASHBOARD_PLACE_PUBLISH_URL(payload.place_slug))
  .then(response => {
      return new Promise((resolve) => { resolve(response) })
  })
  .catch((error) => {

      return new Promise((resolve, reject) => { reject(error) })
  })
}


renewPlace(payload){
  return Vue.http.post(API.DASHBOARD_PLACE_RENEW_URL(payload.place_slug))
  .then(response => {
      return new Promise((resolve) => { resolve(response) })
  })
  .catch((error) => {

      return new Promise((resolve, reject) => { reject(error) })
  })
}
  




}