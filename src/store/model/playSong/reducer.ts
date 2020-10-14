/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 17:08:49
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-14 18:16:46
 */
import {ADD_SONG} from './actionTypes'

const defaultState = {
    songInfos:[] //存储播放的歌曲信息
}  //默认数据
export default (state = defaultState,action:any)=>{  //就是一个方法函数
    let newState = JSON.parse(JSON.stringify(state))
    if(action.type===ADD_SONG){
        let len = newState.songInfos.length
        if(len===0){
            newState.songInfos.push(action.songInfo)
        }else{
            let songIds = newState.songInfos.map((item:any)=>item.id)
            if(songIds.indexOf(action.songInfo.id)===-1){
                newState.songInfos.push(action.songInfo)
            }
        }
        return newState
    }
    return state
}