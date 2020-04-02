import cookie from "js-cookie";

// var adminName="userName"; //默认存在cook中key值
// var token="token";
var appCook={
  setCookname: (key,value)=>{
    cookie.set(key,value)
  },
  getCookname: cookName=>cookie.get(cookName),

  removeCookName: (cookName)=>{
    cookie.remove(cookName)
  },





};
export default appCook;
