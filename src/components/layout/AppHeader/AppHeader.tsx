import React, { Component, ReactNode } from 'react'
import './AppHeader.scss'
import {
  SearchOutlined
} from '@ant-design/icons';
import {Input} from 'antd'

class AppHeader extends Component<{}, any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      barData: [{
        name: '发现音乐',
        content: ''
      }, {
        name: '我的音乐',
        content: ''
      }, {
        name: '朋友',
        content: ''
      }, {
        name: '商城',
        content: ''
      }, {
        name: '音乐人',
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
                  <li className='bar-item' key={item.name} onClick={() => this.itemClick(index)}><span><em>{item.name}</em></span></li>
                )
              })}
            </ul>
          </div>
        <div className="search-bar"><Input prefix={<SearchOutlined />} /></div>
      </div>
    )
  }


// 导航栏点击
  private itemClick(index: number) {
    let key:number = this.state.activeKey;
    let ele = document.querySelectorAll('.bar-item') as any
    ele[key].classList.remove("active")
    ele[index].classList.add("active")
    this.setState({activeKey:index})
  }

}

interface barItem {
  name: string,
  content: string | ReactNode
}

export default AppHeader
