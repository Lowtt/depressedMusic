import React, { Component } from 'react'
import { RouteComponentProps } from "react-router";
import {
  NavLink,
  withRouter
} from "react-router-dom"
import './navBar.scss'

class NavBar extends Component<IAllTrendProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      barData: [[{ name: '推荐', path: '/discover' }, { name: '排行榜', path: '' }, { name: '歌单', path: '' }, { name: '主播电台', path: '' }, { name: '歌手', path: '' }, { name: '新碟上架', path: '' },]],
      activeKey: 0 //默认第一个打开
    }
  }
  public componentDidMount() {
    let index = this.props.activeKey
    let ele = document.querySelectorAll('.nav-item-name') as any
    ele[index].classList.add("active-item")
  }
  render() {
    const { barData } = this.state
    const { activeKey } = this.props
    return (
      <div className="nav-bar">
        <ul className="nav-ul">
          {barData[activeKey].map((item: itemType) => {
            return (
              <li className="nav-item" key={item.name}>
                <span className='nav-item-name'><NavLink to={item.path}>{item.name}</NavLink></span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

 


}
interface IAllTrendProps extends RouteComponentProps { 
  activeKey:number
}
interface itemType {
  name: string
  path: string

}

export default withRouter(NavBar)

