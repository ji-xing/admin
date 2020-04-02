import service from "./index"

/**
 * 获取短信验证码
 * @param data
 * @return {Promise<AxiosResponse<T>>}
 */
export function getSM(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data:data
  })
}
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data:data
  })
}


