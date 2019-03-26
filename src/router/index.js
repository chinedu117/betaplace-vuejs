import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)


const router =  new VueRouter({
                mode: 'history',
                routes: routes
              })

 // Global guard
  router.beforeEach( (to, from, next) => {

    const requiresAuth =  to.matched.some((route) => route.meta.requiresAuth)
    const forPublic = to.matched.some((route) => route.meta.public)
    const authed = store.getters["auth/loggedIn"]

    // console.log("this route requires auth   " + requiresAuth, "this person is authenticated  " + authed, "this is for public" + forPublic)
           
       
    if(requiresAuth)
    {
        
        if(!authed)
        {
          next({name: 'Login' })
    
        }else{
          next()
          
        }
  
    }else if(forPublic)
    {
        if( authed)
        { 
          // Go back to whwere you are coming from 
        //console.log(from.fullPath)
          next({ name: 'Home' })
          store.dispatch('common/updateSnackBar',{msg: "please Logout", show: true, timeout: 6000, color: 'red'})
    
        }else{
          next()
        }
          
    }else {

      next()
      
    }
  })
 
  export default router
  