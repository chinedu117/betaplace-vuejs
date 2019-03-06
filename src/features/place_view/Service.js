import store from '@/store'
import Vue from 'vue'
// import auth from '@/auth/helpers'
import * as API from '@/api'

export default class Service {
  constructor () {
    
  }
  
  //api call to rate an agent
  rateAgent(agentID,rating){

    return Vue.http.post(API.AGENT_RATING_URL(agentID),{rating:rating})
              .then(response => {

                return new Promise((resolve) => { resolve(response) })
            })
            .catch((error) => {

              return new Promise((resolve, reject) => { reject(error) })
            })
  }
  
  //api called on like share or goto map
  statRequest(statID,statName){

    return Vue.http.post(API.PLACE_STAT_URL(statID),{'action': statName})
              .then(response => {

                return new Promise((resolve) => { resolve(response) })
            })
            .catch((error) => {

              return new Promise((resolve, reject) => { reject(error) })
            })
  }
  

  




}