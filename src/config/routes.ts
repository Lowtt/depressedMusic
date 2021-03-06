/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-09-28 17:36:30
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-22 10:03:05
 */
import { RouteProps } from "react-router";
import { lazy } from "react";
interface IRouteItem extends RouteProps {
    view?: string;
  }
let routes: IRouteItem[] = [
  {
    path: "/discover", // 热门推荐
    view: "discover"
  },
  {
    path: "/search", // 内容搜索
    view: "search"
  },
  {
    path:'/song',//歌曲详情
    view:'song'
  }
  
];

for (const item of routes) {
  if (item.view) {
    item.component = lazy(() => import(("../views/" + item.view) as string));
  }
}

export default routes;
