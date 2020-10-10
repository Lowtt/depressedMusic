import React, { Component, ReactNode } from 'react'
import { RouteComponentProps,withRouter } from "react-router";
import { Input } from 'antd'

import './AppHeader.scss'
const { Search } = Input;
class AppHeader extends Component<RouteComponentProps, any,any> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      barData: [{
        name: '发现音乐',
        path:'/discover',
        content: ''
      }, {
        name: '我的音乐',
        path:'/',
        content: ''
      }, {
        name: '朋友',
        path:'/',
        content: ''
      }, {
        name: '商城',
        path:'/',
        content: ''
      }, {
        name: '音乐人',
        path:'/',
        content: ''
      }],
      activeKey: 0 //默认第一个打开
    }
  }

  public componentDidMount() {
    (document.querySelectorAll('.bar-item') as any)[0].classList.add("active")
  }

  render() {
    const { barData } = this.state
    return (
      <div className="app-header">

        <div className="header-img"></div>
        <div className="top-bar">
          <ul className='bar-ul'>
            {barData.map((item: barItem, index: number) => {
              return (
                <li className='bar-item' key={item.name} onClick={() => this.itemClick(index,item.path)}><span><em>{item.name}</em></span></li>
              )
            })}
          </ul>
        </div>
        <div className="search-bar">
          <Search
            onSearch={this.search.bind(this)}
          />
        </div>
      </div>
    )
  }
  private search(val: string) {
    if (val) {
      this.props.history.push('/search?value=' + val)
    }
  }

  // 导航栏点击
  private itemClick(index: number,path:string) {
    let key: number = this.state.activeKey;
    let ele = document.querySelectorAll('.bar-item') as any
    ele[key].classList.remove("active")
    ele[index].classList.add("active")
    this.setState({ activeKey: index })
    this.props.history.push(path)
  }

}

interface barItem {
  name: string,
  path:string
  content: string | ReactNode
}

export default withRouter(AppHeader)
