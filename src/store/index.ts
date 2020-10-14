/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-10-14 16:46:03
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-14 16:47:51
 */
import { createStore } from 'redux'  // 引入createStore方法

import reducer from './reducer' 


const store = createStore(reducer)          // 创建数据存储仓库
export default store 