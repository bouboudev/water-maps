import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

// const user = firebase.auth().currentUser;

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    signUpAction({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert("success");
          // response will have user
          // user will have uid will be updated to the state
          commit("setUser", response.user.uid);

          commit("setError", null);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
  },
});
