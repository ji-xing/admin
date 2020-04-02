import { GetCategory, GetCategoryAll } from "@/api/news";
const state={

};
const getters={

};
const mutations={
  SET_USERNAME:(state,value)=>{
    state.user_name=value
  },


};
const actions={
  getInfoCategoryAll(){ //获取全部分类
    return new Promise((resolve,reject)=>{
      GetCategoryAll().then((res)=>{
        resolve(res.data.data)
      }).catch((error)=>{
        console.log(error)
      })
    })
  },
  GetFirstCatogory(){ //获取一级分类
    return new Promise((resolve,reject)=>{
      GetCategory().then((res)=>{
        resolve(res.data.data)
      }).catch((error)=>{
        console.log(error)
      })
    })
  },

};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}