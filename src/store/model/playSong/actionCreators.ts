/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 17:17:23
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-21 15:59:07
 */

import {
    ADD_SONG,
    PLAY_SONG
} from './actionTypes'

class Action {
    public addSongAction = (songInfo: any) => ({
        // 添加歌曲
        type: ADD_SONG,
        songInfo
    })

    public playSongAction = (songInfo:any)=>({
        //播放歌曲
        type:PLAY_SONG,
        songInfo
    })
}

const action = new Action()



export default action