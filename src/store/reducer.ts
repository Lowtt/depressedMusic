/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 16:46:32
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-14 17:13:55
 */
import {combineReducers} from 'redux'
import playReducer from './model/playSong/reducer'


const reducer = combineReducers({
    play:playReducer
})

export default reducer