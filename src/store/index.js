import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import firebase from "firebase";


// const user = firebase.auth().currentUser;

export default new Vuex.Store({
  state: {
    user:{
      id: "1234",
      email: "testStore@test.fr",
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})


