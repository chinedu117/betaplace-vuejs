// Common State.
const defaults = {
    sidebar: {  
      visible: true
    },
    loading: false,
    title: '',
    layout: 'DefaultLayout',
    dialog: {
      visible: false,
      text: ''
    },
    snackBar: {
      show: false,
      msg: '',
      timeout: 6000,
      color: ''
    },
    error: {
      code: null,
      level: null,
      message: ''
    },

    toolBar:{
      show: true,
      component:''
    }
  }
  
  // Global module loaded on first app load.
  export default {
    namespaced: true,
  
    state: Object.assign({}, defaults),
  
    mutations: {
      updateSidebar (state, options) {
        state.sidebar = Object.assign({}, defaults.sidebar, options)
      },

      updateToolBar (state, options) {
        state.toolBar = Object.assign({}, defaults.toolBar, options)
      },
  
      updateTitle (state, title) {
        state.title = title
      },
  
      updateLayout (state, layout) {
        state.layout = layout
      },

      updateLoader(state,value){

        state.loading = value
      },
  
      updateDialog (state, options) {
        state.dialog = Object.assign({}, defaults.dialog, options)
      },
  
      updateSnackBar (state, options) {
        state.snackBar = Object.assign({}, defaults.snackBar, options)
      },
  
    //   error (state, options) {
    //     state.error = Object.assign({}, defaults.error, options)
    //   },
  
    //   clear (state) {
    //     state = Object.assign({}, defaults)
    //   }
    },
  
    actions: {
      updateLoader({commit},value)
      {
        commit('updateLoader',value)
      },
    //   clear ({ state, commit, rootState, dispatch }) {
    //     commit('clear')
    //     dispatch('auth/clear', {}, { root: true })
    //   },
  
      updateSidebar ({ commit }, options) {
        commit('updateSidebar', options)
      },
      updateToolBar ({ commit }, options) {
        commit('updateToolBar', options)
      },
  
      updateTitle ({ commit }, title) {
        commit('updateTitle', title)
      },
  
      updateLayout ({ commit }, layout) {
        commit('updateLayout', layout)
      },
  
      updateDialog ({ commit }, options) {
        commit('updateDialog', options)
      },
  
      updateSnackBar ({ commit }, options) {
        commit('updateSnackBar', options)
      }
    }
  }
  