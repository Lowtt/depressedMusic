/*
 * @Description: 首页推荐api
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-09-29 16:01:23
 * @LastEditors: Lowt
 * @LastEditTime: 2020-09-29 16:10:10
 */
import fetch from '../utils/fetch'

class DiscoverApi {
 
  public queryBanner(req:any) {
    return fetch.post<any>('/api/0/user/queryUserMenuForTree',req)
  }

}

const discoverApi = new DiscoverApi()

export default discoverApi
