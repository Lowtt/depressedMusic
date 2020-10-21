/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 17:08:49
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-21 16:13:48
 */
import { ADD_SONG, PLAY_SONG } from './actionTypes'

const defaultState = {
    songLists: [], //存储播放的歌曲信息
    play: false,//是否播放歌曲
}  //默认数据
export default (state = defaultState, action: any) => {  //就是一个方法函数
    let newState = JSON.parse(JSON.stringify(state))
    if (action.type === ADD_SONG) {
        let len = newState.songLists.length
        if (len === 0) {
            newState.songLists.push(action.songInfo)
        } else {
            let songIds = newState.songLists.map((item: any) => item.id)
            if (songIds.indexOf(action.songInfo.id) === -1) {
                newState.songLists.push(action.songInfo)
            }
        }
        newState.play = false
        return newState
    }

    if (action.type === PLAY_SONG) {
        let len = newState.songLists.length
        if (len === 0) {
            newState.songLists.push(action.songInfo)
            newState.willPlayIndex = 0
        } else {
            let songIds = newState.songLists.map((item: any) => item.id)
            let index = songIds.indexOf(action.songInfo.id)
            if (index === -1) {
                newState.songLists.push(action.songInfo)
                newState.willPlayIndex = newState.songLists.length - 1
            } else {
                newState.willPlayIndex = index
            }
        }
        newState.play = true
        return newState
    }
    return state
}