/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-22 10:53:15
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-22 15:43:39
 */
import fetch from '../utils/fetch'

class SongApi {
 
  public queryDetail(req:any) {
    // 查询歌曲详情
    return fetch.get<any>(`/song/detail?ids=${req.id}`)
  }

  public queryComment(req:any) {
    // 查询歌曲评论
    return fetch.get<any>(`/comment/music?id=${req.id}&offset=${req.offset}`)
  }

  public queryLyric(req:any) {
    // 查询歌词
    return fetch.get<any>(`/lyric?id=${req.id}`)
  }


}

const songApi = new SongApi()

export default songApi