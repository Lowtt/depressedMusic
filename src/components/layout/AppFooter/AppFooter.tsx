import React, { Component, ReactNode } from 'react'
import { RouteComponentProps, withRouter } from "react-router";
import { createFromIconfontCN } from '@ant-design/icons';

import './AppFooter.scss'


const MyIcon = createFromIconfontCN({
  scriptUrl: (window as any).ICON_URL
});
class AppFooter extends Component<RouteComponentProps, any> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      lockStatus: true,//默认播放栏隐藏,此时锁状态为开
    }
  }

  public componentDidMount() {

  }

  render() {
    const { lockStatus } = this.state
    return (
      <div className="app-footer">
        <div className="play-bar">
          <div className="play-info"></div>
          <div className="play-lock">{lockStatus ? <MyIcon onClick={this.changeLockStatus.bind(this)} type='iconsuokai' /> : <MyIcon onClick={this.changeLockStatus.bind(this)} type='iconsuoguan' />}</div>
        </div>

      </div>
    )
  }

  private changeLockStatus() {
    let lock = this.state.lockStatus
    let ele: any = document.querySelector('.play-bar')
    if (lock) {
      // 此时锁开,触发是需要锁关,即播放栏锁定
      ele.style.bottom = 0
    } else {
      ele.style.bottom = '-52px'
    }
    this.setState({ lockStatus: !lock })
  }
}



export default withRouter(AppFooter)
