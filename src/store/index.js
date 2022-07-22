import Vue from 'vue'
import Vuex from 'vuex'
import {getitem,setitem} from '@/utlis/loca'
Vue.use(Vuex)
        //vuex
export default new Vuex.Store({
  state: {
    user: getitem('user_token')
    // JSON.parse(localStorage.getItem('user_token'))
    
  },
  getters: {
   
     
  },
  mutations: {
    setuser(state,payold){
      state.user=payold
      setitem('user_token',state.user)
   //  window.localStorage.setItem('user_token',JSON.stringify(state.user))
    },
  },
  actions: {
  },
  modules: {
  }
})
