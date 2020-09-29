/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-09-28 17:36:30
 * @LastEditors: Lowt
 * @LastEditTime: 2020-09-29 16:59:06
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
  
];

for (const item of routes) {
  if (item.view) {
    item.component = lazy(() => import(("../views/" + item.view) as string));
  }
}

export default routes;
