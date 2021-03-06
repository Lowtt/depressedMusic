/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-04-08 10:01:09
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-20 14:20:07
 */
class Base {


  public authorizationInfo: string =
    sessionStorage.getItem("token") ||
    GetQueryString("token") ||
    localStorage.getItem("sass_token");
}
function GetQueryString(name: string): any {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg); //查询？后面的参数，并匹配正则
  if (r != null) {
    return String(unescape(r[2]));
  } else {
    return null;
  }
}

const baseConfig = new Base();
export default baseConfig;
