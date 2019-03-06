import axios from 'axios'
import store from '@/store'
import * as API from '@/api'


store.registerModule('todo', {
  namespaced: true,

  // State loaded when this component is first loaded.
  state: {
    filter:'all',
    todos:[],
  },

 getters: {

    remainingTodo(state) {

        return state.todos.filter(todo => !todo.completed).length
        
     },

     anyRemaining(state,getters) {
       return getters.remainingTodo > 0
      // return true
     },

     todosFiltered(state) {

        if(state.filter == 'all'){
           
           return state.todos

        }else if(state.filter == 'completed'){

          return state.todos.filter(todo => todo.completed)

        }else if(state.filter == 'active'){

          return state.todos.filter(todo => !todo.completed)
        }else{

            return state.todos

        }
     },

     showCompleted(state) {

        	return state.todos.filter(todo => todo.completed).length > 0
        }
  },

  mutations: {
        emptyList(state) {
            
            state.todos = []
        },

		deleteTodo(state,todoID) {
            
            const index = state.todos.findIndex(todo => todo.id == todoID)

            state.todos.splice(index,1);

        },
        
        checkAll(state,checked) {

        	state.todos.forEach((todo)  => todo.completed = checked)
        },

        updateFilter(state,filter) {

          state.filter = filter
        },

        clearCompleted(state) {

        	state.todos = state.todos.filter(todo => !todo.completed)
        },

        addTodo(state,todo) {
             state.todos.push({
              'id':todo.id,
               'title':todo.title,
               'completed': false,
               'editing': false
           })
        },

		updateTodo(state,todo) {

           const index =  state.todos.findIndex(item => item.id == todo.id)
           	todo.editing = false
            state.todos.splice(index,1,todo)

         }
  },

  actions: {
    // updateTest ({ state, commit, rootState, dispatch }, newVal) {
    //   console.log(newVal)
    //   commit('updateTest', newVal)
    // }

    addTodo({ commit,rootState, rootGetters},todo) {

         console.log(rootGetters["auth/getToken"])
        axios.defaults.headers.common['Authorization'] = rootGetters["auth/getToken"]
              axios.post(API.ADD_TODO_URL,todo)
                  .then(function (response) {
                    
                    commit('addTodo',response.data)
  
  
                    })
                  .catch(function (error) {
  
                         //console.log(error)
                   })
  
        
          },
  
  
        updateTodo({commit,rootGetters},todo) {
             
            axios.defaults.headers.common['Authorization'] = rootGetters["auth/getToken"]

                    axios.patch(API.UPDATE_TODO_URL + todo.id,{
                        'id': todo.id,
                        'title': todo.title,
                        'completed': todo.completed
                    })
                    .then(function (response) {
                        
                        commit('updateTodo',todo)
                        
                        })
                    .catch(function (error) {
                        //   console.log(error) 
                    })
  
             
           
          },
         
       retrieveTodoList({commit,rootGetters}) {
            //remove any existing data     
            commit('emptyList')

            axios.defaults.headers.common['Authorization'] = rootGetters["auth/getToken"]
           
            return new Promise( (resolve,reject) =>{
                axios.get(API.TODO_LIST_URL)
                .then(function (response) {
                   response.data.forEach((todo) => {
                           commit('addTodo',todo)
                        })
                        resolve(response)
                    })
                .catch(function (error) {
                    //  console.log(error)
                         reject(error)
                });


            })
                
          },
  
          deleteTodo({commit,rootGetters},todoID) {
  
            axios.defaults.headers.common['Authorization'] = rootGetters["auth/getToken"]
                axios.delete(API.DELETE_TODO_URL + todoID)
                .then(function (response) {
                        
                        
                        commit('deleteTodo',todoID)
                    //   console.log('Successfully removed')
                    })
                .catch(function (error) {
                    // console.log(error)
                });
          },
  
          checkAll({commit,rootGetters},checked) {
               
        axios.defaults.headers.common['Authorization'] = rootGetters["auth/getToken"]      
               axios.patch(API.CHECKALL_TODO_URL,{
                       completed: checked,
                 })
                  .then(function (response) {
                       
                        // console.log(response) 
                       commit('checkAll',checked)
                       
                    })
                  .catch(function (error) {
                       // console.log(error) 
                   })
  
          },
  
          clearCompleted({state,commit,rootGetters}) {
  
              const completed = state.todos
                                .filter(todo => todo.completed)
                                .map(todo => todo.id)
  
    
        axios.defaults.headers.common['Authorization'] = rootGetters["auth/getToken"]
             axios.delete(API.DELETE_COMPLETED_TODO_URL,{
                 data: {
                     todos:completed,
                     } 
             })
              .then(function (response) {
                     
                    //  console.log('cleared')
                     commit('clearCompleted')
                   
                })
              .catch(function (error) {
                 //  console.log(error)
               });
          }
  }
})