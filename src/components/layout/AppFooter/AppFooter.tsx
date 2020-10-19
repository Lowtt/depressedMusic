import React, { Component, ReactNode } from 'react'
import { RouteComponentProps, withRouter } from "react-router";
import { createFromIconfontCN } from '@ant-design/icons';

import store from '../../../store'

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
    this.changeLockStatus = this.changeLockStatus.bind(this)

  }

  public componentDidMount() {
    store.subscribe(this.onStoreChange.bind(this))
  }

  render() {
    const { lockStatus } = this.state
    return (
      <div className="app-footer">
        <div className="play-bar">
          <div className="play-info">
            <div className="play-controls">
              <p className="last-icon"><MyIcon type='iconshangyiqu'/></p>
              <p className="play-icon"><MyIcon type='iconbofang_active_huaban'/></p>
              <p className="next-icon"><MyIcon type='iconxiayiqu'/></p>
            </div>
          </div>
          <div className="play-lock" ><MyIcon onClick={this.changeLockStatus} type={lockStatus ? 'iconsuokai' : 'iconsuoguan'} /></div>
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


  // 监听store变化
  private onStoreChange() {
    this.setState(
      store.getState().playInfo
    )
  }
}



export default withRouter(AppFooter)
