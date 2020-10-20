/*
 * @Description: 搜索内容api
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-10 11:40:15
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-20 15:48:00
 */
import fetch from '../utils/fetch'

class SearchApi {
 
  public query(req:any) {
    // 查询歌曲/电台等
    return fetch.get<any>(`/cloudsearch?limit=20&keywords=${req.keywords}&type=${req.type}`)
  }

  public queryHotList(req:any) {
    // 查询热门推荐数据
    return fetch.post<any>('/personalized',req)
  }

  public querySongUrl(req:any) {
    // 查询歌曲播放地址
    return fetch.get<any>(`/song/url?id=${req.id}`)
  }

}

const searchApi = new SearchApi()

export default searchApi