import Login from '@/auth/Login'
import Register from '@/auth/Register'
import Logout from '@/auth/Logout'
import PageNotFound from '@/pages/PageNotFound'
import PlaceView from '@/features/place_view/main.vue'
import Places from '@/features/places_list/main.vue'
import AgentPublicPlaces from '@/features/places_list/AgentPlacesList.vue'
import MyPlaces from '@/features/dashboard/AgentPlacesList.vue'
import OurPackages from '@/features/dashboard/OurPackages.vue'
import PackageView from '@/features/dashboard/PackageView.vue'
import CreateEditPlace from '@/features/dashboard/PlaceCreateEdit.vue'
import MySubscriptions from '@/features/dashboard/AgentSubscriptions.vue'
import Dashboard from '@/features/dashboard/main.vue'
import VerifyEmail from '@/auth/VerifyEmail.vue'
import CreateEditProfile from '@/auth/CreateEditProfile.vue'
import AgentProfileView from '@/auth/AgentProfile'
import store from '@/store'
import ForgotPassword from '@/auth/ForgotPassword'
import ResetPassword from '@/auth/ResetPassword'



const routes = [
  {
    path:'/profile-view/:agentSlug',
    component: AgentProfileView,
    name: 'AgentProfileView',
    beforeEnter:(to, from, next) => {
      const title = 'My  Profile'
      const layout = 'DashboardLayout'
      document.title = title
       store.dispatch('common/updateTitle',title)
       store.dispatch('common/updateLayout', layout)
      //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
       next()
    },
    
},
  {

   
    path:'/profile/:agentSlug?',
    component: CreateEditProfile,
    name: 'AgentProfile',
    beforeEnter:(to, from, next) => {
      const title = 'My  Profile'
      const layout = 'DashboardLayout'
      //const authed = to.matched.some( (route) => route.meta.requires)
       // Setup some per-page stuff.
       document.title = title
       store.dispatch('common/updateTitle',title)
       store.dispatch('common/updateLayout', layout)
      //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
       next()
    },
    
},
  {

   
    path:'/verification',
    component: VerifyEmail,
    name: 'VerifyEmail',
    props: true,
    beforeEnter:(to, from, next) => {
      const title = 'Verify Email'
      const layout = 'DefaultLayout'
      //const authed = to.matched.some( (route) => route.meta.requires)
       // Setup some per-page stuff.
       document.title = title
       store.dispatch('common/updateTitle',title)
       store.dispatch('common/updateLayout', layout)
      //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
       next()
    },
    
},
  {

   
    path:'/reset-password/:token/:email',
    component: ResetPassword,
    name: 'ResetPassword',
    props: true,
    beforeEnter:(to, from, next) => {
      const title = 'Reset password'
      const layout = 'DefaultLayout'
      //const authed = to.matched.some( (route) => route.meta.requires)
       // Setup some per-page stuff.
       document.title = title
       store.dispatch('common/updateTitle',title)
       store.dispatch('common/updateLayout', layout)
      //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
       next()
    },
    
},
{

   
  path:'/forgot-password',
  component: ForgotPassword,
  name: 'ForgotPassword',
  props: true,
  beforeEnter:(to, from, next) => {
    const title = 'Forgot Password'
    const layout = 'DefaultLayout'
    //const authed = to.matched.some( (route) => route.meta.requires)
     // Setup some per-page stuff.
     document.title = title
     store.dispatch('common/updateTitle',title)
     store.dispatch('common/updateLayout', layout)
    //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
     next()
  },
  
},

  {

   
      path:'/agent/:agentSlug',
      component: Dashboard,
      name: 'agentHome',
      beforeEnter:(to, from, next) => {
        const title = 'Dashboard'
        const layout = 'DashboardLayout'
        //const authed = to.matched.some( (route) => route.meta.requires)
         // Setup some per-page stuff.
         document.title = title
         store.dispatch('common/updateTitle',title)
         store.dispatch('common/updateLayout', layout)
        //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
         next()
      },
      
  },
  { // Create or edit a place
    path: '/:agentSlug/manage-place/:placeSlug?', //TODO the agents slug will come fiirst
    name: 'createEdit',
    component: CreateEditPlace,
    meta: {
      //requiresAuth: false
    },
    beforeEnter: (to, from, next) => {
      const title = 'Manage Accomodation'
      const layout = 'DashboardLayout'
      //const authed = to.matched.some( (route) => route.meta.requires)
      // Setup some per-page stuff.
      document.title = title
      store.dispatch('common/updateTitle', title)
      store.dispatch('common/updateLayout', layout)
      //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
      next()
    }
},
{ // Create or edit a place
  path: '/packages', //TODO the agents slug will come fiirst
  name: 'ourPackages',
  component: OurPackages,
  meta: {
    //requiresAuth: false
  },
  beforeEnter: (to, from, next) => {
    const title = 'Packages'
    const layout = 'DashboardLayout'
    //const authed = to.matched.some( (route) => route.meta.requires)
    // Setup some per-page stuff.
    document.title = title
    store.dispatch('common/updateTitle', title)
    store.dispatch('common/updateLayout', layout)
    //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
    next()
  }
},

{ // Create or edit a place
  path: '/package-view/:planID', //TODO the agents slug will come fiirst
  name: 'PackageView',
  component: PackageView,
  meta: {
    //requiresAuth: false
  },
  beforeEnter: (to, from, next) => {
    const title = 'Package Details'
    const layout = 'DashboardLayout'
    //const authed = to.matched.some( (route) => route.meta.requires)
    // Setup some per-page stuff.
    document.title = title
    store.dispatch('common/updateTitle', title)
    store.dispatch('common/updateLayout', layout)
    //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
    next()
  }
},
{ // Create or edit a place
  path: '/:agentSlug/my-subscriptions', //TODO the agents slug will come fiirst
  name: 'mySubscriptions',
  component: MySubscriptions,
  meta: {
    //requiresAuth: false
  },
  beforeEnter: (to, from, next) => {
    const title = 'My Subscriptions'
    const layout = 'DashboardLayout'
    //const authed = to.matched.some( (route) => route.meta.requires)
    // Setup some per-page stuff.
    document.title = title
    store.dispatch('common/updateTitle', title)
    store.dispatch('common/updateLayout', layout)
    //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
    next()
  }
},
{     //The places belonging to an agent
      path: '/:agentSlug/my-places',
      name: 'MyPlaces',
      component: MyPlaces,
      meta: {
        //requiresAuth: false
      },
      beforeEnter: (to, from, next) => {
        //agent must have filed the profile
        const title = 'My Places'
        const layout = 'DashboardLayout'
        //const authed = to.matched.some( (route) => route.meta.requires)
        // Setup some per-page stuff.
        document.title = title
        store.dispatch('common/updateTitle', title)
        store.dispatch('common/updateLayout', layout)
        //  store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
        next()
      }
},
 
    {
      path: '/',
      name: 'Home',
      component: Places,
      beforeEnter:(to, from, next) => {
             const title = 'Available Places'
             const layout = 'DefaultLayout'
            //const authed = to.matched.some( (route) => route.meta.requires)
             // Setup some per-page stuff.
             document.title = title
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
             store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
             next()
      
          }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
      meta:{
        layout: 'DefaultLayout',
        title: 'Login',
        requiresAuth: false,
        public: true
      },
      beforeEnter:(to, from, next) => {
            const title = 'Login'
            const layout = 'DefaultLayout'
            //const authed = to.matched.some( (route) => route.meta.requires)
             // Setup some per-page stuff.
             document.title = title
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
             next()
      
          }
      
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        layout: 'DefaultLayout',
        title: 'Register',
        requiresAuth: false,
        public: true
      },
      beforeEnter:(to, from, next) => {
            const title = 'Register'
            const layout = 'DefaultLayout'
            //const authed = to.matched.some( (route) => route.meta.requires)
             // Setup some per-page stuff.
             document.title = title
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
         
             next()
          }
     
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        title: 'Log Out',
        layout: 'DefaultLayout',
        requiresAuth: true
      },
      beforeEnter:(to, from, next) => {
            const title = 'Log Out'
            const layout = 'DefaultLayout'
            //const authed = to.matched.some( (route) => route.meta.requires)
             // Setup some per-page stuff.
             document.title = title
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
         
             next()
          }
     },
    {
      path: '/place-detail/:id',
      name: 'PlaceView',
      component: PlaceView,
      meta: {
        //requiresAuth: false
      },
      beforeEnter:(to, from, next) => {
            const title = 'Place view'
            const layout = 'DefaultLayout'
            //const authed = to.matched.some( (route) => route.meta.requires)
             // Setup some per-page stuff.
             document.title = title
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
         
             next()
          }
     },
     {
      path: '/places',
      name: 'Places',
      component: Places,
      meta: {
        //requiresAuth: false
      },
      beforeEnter:(to, from, next) => {
            const title = 'Available Places'
            const layout = 'DefaultLayout'
            //const authed = to.matched.some( (route) => route.meta.requires)
             // Setup some per-page stuff.
             document.title = title
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
             store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
             next()
          }
     },
     {
      path: '/:agentSlug',
      name: 'Agent',
      component:  AgentPublicPlaces,
      meta: {
        //requiresAuth: false
      },
      beforeEnter:(to, from, next) => {
            const title = 'Agent'
            const layout = 'DefaultLayout'
            //const authed = to.matched.some( (route) => route.meta.requires)
             // Setup some per-page stuff.
             document.title = title
             store.dispatch('common/updateTitle',title)
             store.dispatch('common/updateLayout', layout)
         
             next()
          }
     },
     {
       path: '*',
       name: 'error',
       component: PageNotFound,
       beforeEnter: (to, from , next) => {
        const title = 'Not Found'
        const layout = 'DefaultLayout'
        //const authed = to.matched.some( (route) => route.meta.requires)
         // Setup some per-page stuff.
         document.title = title
         store.dispatch('common/updateTitle',title)
         store.dispatch('common/updateLayout', layout)
     
         next()
       }
     }

  ]

export default routes