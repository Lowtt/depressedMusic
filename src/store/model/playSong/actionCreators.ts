/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 17:17:23
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-14 17:26:16
 */

import {
    INPUT_CHANGE
} from './actionTypes'

class Action {
    public inputChangeAction = (id: any) => ({
        type: INPUT_CHANGE,
        id
    })
}

const action = new Action()



export default action