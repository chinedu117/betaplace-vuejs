
export const baseUrl = 'http://betaplace.test/api'

export const PLACES_URL = baseUrl + '/p'

export const PLACES_SEARCH_URL = PLACES_URL + '/s'

export const PLACES_FILTER_URL = PLACES_URL + '/f'

export const PLACE_URL = (placeSlug) => {
    return baseUrl + '/pl/' + placeSlug
} 

export const PLACE_STAT_URL = (statID) => {
    return baseUrl + '/pl/stat/' + statID 
}

export const AGENT_RATING_URL = (agentSlug) => {
    return baseUrl + '/pl/ag/' + agentSlug
}

export const DASHBORD_PLACE_IMAGE_REMOVE_URL = (placeSlug)  =>{
    return baseUrl + '/d/p/' + placeSlug +'/i/d'
}  

export const AGENT_PLACE_DELETE_URL = (slug) => {
    return baseUrl + '/d/p/'+ slug +'/d'
} 

export const DASHBORD_PLACE_IMAGE_SAVE_URL  = (placeSlug)  =>{
    return baseUrl + '/d/p/' + placeSlug +'/i'
}  

export const DASHBORD_PLACE_FEATURE_SAVE_URL  = (placeSlug)  =>{

    return baseUrl + '/d/p/' + placeSlug +'/f'
}  

export const DASHBORD_PLACE_CREATE_URL = baseUrl + '/d/p/c'

export const DASHBOARD_PLACE_PUBLISH_URL = (placeSlug) => {
     return baseUrl + '/d/p/' + placeSlug + '/pb'
}
export const DASHBORD_PLACE_EDIT_URL = (placeSlug) =>{
    return baseUrl + '/d/p/' + placeSlug +'/e'
}
export const PLACE_CATEGORY_LIST_URL = baseUrl + '/d/cat/l'

export const AGENT_PLACES_URL = baseUrl + '/ag/p'

// AUTHENTICATION //
export const REGISTER_URL = baseUrl + '/register'
export const LOGIN_URL = baseUrl + '/login'
export const LOGOUT_URL = baseUrl + '/logout'
export const SUBMIT_PROFILE_URL  = baseUrl + '/profile-submit'
export const GET_MY_PROFILE_URL  = baseUrl + '/profile'
export const AGENT_PROFILE_IMAGE_UPLOAD_URL = baseUrl + '/profile-img'
export const RESEND_VERIFICATION_MAIL_URL = baseUrl + '/resend-verification'
export const FORGOT_PASSWORD_URL = baseUrl + '/forgot-password'
export const RESET_PASSWORD_URL = baseUrl + '/reset-password'

// export const PLACE_LIKE = baseUrl + '/p'

// export const PLACE_SHARE_WHATSAPP = baseUrl + '/p'

// export const PLACE_CONTACT_AGENT_WHATSAPP = baseUrl + '/p'



export const TODO_LIST_URL = baseUrl + '/todo'

export const ADD_TODO_URL = TODO_LIST_URL

export const DELETE_TODO_URL = TODO_LIST_URL + '/'

export const UPDATE_TODO_URL = DELETE_TODO_URL

export const CHECKALL_TODO_URL =  baseUrl  + "/todoCheckAll"

export const DELETE_COMPLETED_TODO_URL = baseUrl  + "/todoDeleteCompleted"




export const USER_INFO_URL = baseUrl + "/user"