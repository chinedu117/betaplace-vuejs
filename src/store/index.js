import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as API from '@/api'
import common from './common'
import auth from '@/auth/store'

Vue.use(Vuex)

export default  new Vuex.Store({
  
    modules: { common, auth }
  
})

