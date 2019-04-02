import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as API from '@/api'
import common from './common'
import auth from '@/auth/store'
import dashboard_store from '@/features/dashboard/store'
Vue.use(Vuex)

export default  new Vuex.Store({
  
    modules: { common, auth, dashboard_store }
  
})

