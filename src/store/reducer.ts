/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 16:46:32
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-20 14:03:26
 */
import {combineReducers} from 'redux'
import playReducer from './model/playSong/reducer'


const reducer = combineReducers({
    songLists:playReducer
})

export default reducer