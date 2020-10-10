/*
 * @Description: 搜索内容api
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-10 11:40:15
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-10 15:53:37
 */
import fetch from '../utils/fetch'

class SearchApi {
 
  public query(req:any) {
    // 查询歌曲/电台等
    return fetch.get<any>(`/search?limit=20&keywords=${req.keywords}&type=${req.type}`)
  }

  public queryHotList(req:any) {
    // 查询热门推荐数据
    return fetch.post<any>('/personalized',req)
  }

}

const searchApi = new SearchApi()

export default searchApi