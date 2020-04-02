import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import app from "./modules/app.js"
import commom from "./modules/common.js"

export default new Vuex.Store({
  modules: {
    app,
    commom
  }
})
