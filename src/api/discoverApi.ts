/*
 * @Description: 首页推荐api
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-09-29 16:01:23
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-09 15:43:09
 */
import fetch from '../utils/fetch'

class DiscoverApi {
 
  public queryBanner(req:any) {
    // 查询轮播数据
    return fetch.post<any>('/banner',req)
  }

  public queryHotList(req:any) {
    // 查询热门推荐数据
    return fetch.post<any>('/personalized',req)
  }

}

const discoverApi = new DiscoverApi()

export default discoverApi
