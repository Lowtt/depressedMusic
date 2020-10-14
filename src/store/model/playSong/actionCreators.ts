/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 17:17:23
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-14 18:27:24
 */

import {
    ADD_SONG
} from './actionTypes'

class Action {
    public addSongAction = (songInfo: any) => ({
        type: ADD_SONG,
        songInfo
    })
}

const action = new Action()



export default action