import {Login} from "../../api/login"
import  appCook from "../../untils/app"
const state={
  user_name:appCook.getCookname("userName") || "",
  token:appCook.getCookname("token") || "",
  collapse:false
};
const getters={
  get_token:state => state.token,
  get_collapse:state => state.collapse
};
const mutations={
  SET_USERNAME:(state,value)=>{
    state.user_name=value
  },
  SET_TOKEN:(state,value)=>{
    state.token=value
  },
  SET_COLLAPSE:(state)=>{
    state.collapse= !state.collapse;
  }

};
const actions={
   login:((context,data)=>{
      return new Promise((resolve,reject)=>{
          Login(data).then((res)=>{
            resolve(res);
            let mes=res.data.data;
            context.commit('SET_TOKEN',mes.token);//存入vuex
            context.commit('SET_USERNAME',mes.username);
            appCook.setCookname("userName",mes.username); //存入cook
            appCook.setCookname("token",mes.token);
          }).catch((error)=>{
            reject(error)
          })


      })
   })
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}