import React, { Component } from 'react'
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
      playStatus: false,//默认的播放状态，此时为暂停状态
      activeSong:[] //正在播放的歌曲集合
    }
    this.changeLockStatus = this.changeLockStatus.bind(this)
    this.changePlayStatus = this.changePlayStatus.bind(this)
  }

  public componentDidMount() {
    store.subscribe(this.onStoreChange.bind(this))
  }

  render() {
    const { lockStatus, playStatus } = this.state
    return (
      <div className="app-footer">
        <div className="play-bar">
          <div className="play-info">
            <div className="play-controls">
              <p className="last-icon"><MyIcon type='iconshangyiqu' title='上一曲' /></p>
              <p className="play-icon"><MyIcon onClick={this.changePlayStatus} type={playStatus ? 'iconplus-pause' : 'iconbofang_bar'} title={playStatus ? '暂停' : '播放'} /></p>
              <p className="next-icon"><MyIcon type='iconxiayiqu' title='下一曲' /></p>
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

  private changePlayStatus() {
    const {playStatus,playInfo,activeSong} = this.state
    if(!playInfo.length&&!activeSong.lenght){
      return
    }
    if(activeSong.length){
      if(playStatus){
        
      }
    }
  }


  // 监听store变化
  private onStoreChange() {
    this.setState(
      store.getState().playInfo
    )
  }
}



export default withRouter(AppFooter)
