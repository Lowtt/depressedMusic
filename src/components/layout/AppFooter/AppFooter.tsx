import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from "react-router";
import { createFromIconfontCN } from '@ant-design/icons';
import { message, Progress, Slider, Divider } from 'antd'


import pageApi from '../../../api/searchApi'
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
      songLists: store.getState().songLists.songLists,//播放歌单
      activeSong: null, //正在播放的歌曲
      playEle: null,//播放的元素
      playIndex: 0,//播放的歌曲在歌单中的下标
      playModel: 'order',//播放模式(顺序order,随机random,单曲循环loop)
      percentNum: 0,//歌曲加载条
      currentNum: 0,//歌曲进度条
      loadedInter: null,//记载加载条的定时器
      progressInter: null,//记载进度的定时器
      currentTime: '00:00',//歌曲当前时间
      durationTime: '00:00',//歌曲总时间
      showVolume: false,//展示音量控制按键
      initVolume: 0,//初始音量
    }
    this.changeLockStatus = this.changeLockStatus.bind(this)
    this.changePlayStatus = this.changePlayStatus.bind(this)
    this.changePlayModel = this.changePlayModel.bind(this)
    this.playLastSong = this.playLastSong.bind(this)
    this.playNextSong = this.playNextSong.bind(this)
  }

  public componentDidMount() {
    store.subscribe(this.onStoreChange.bind(this))
  }

  render() {
    const { lockStatus, playStatus, activeSong, percentNum, currentNum, currentTime, durationTime, playModel, showVolume, initVolume } = this.state
    return (
      <div className="app-footer">
        <div className="play-bar">
          <div className="play-info">
            <div className="play-controls">
              <p className="last-icon"><MyIcon onClick={this.playLastSong} type='iconshangyiqu' title='上一曲' /></p>
              <p className="play-icon"><MyIcon onClick={this.changePlayStatus} type={playStatus ? 'iconzanting' : 'iconbofang_bar'} title={playStatus ? '暂停' : '播放'} /></p>
              <p className="next-icon"><MyIcon onClick={this.playNextSong} type='iconxiayiqu' title='下一曲' /></p>
            </div>
            <div className="album-img" style={{ backgroundImage: `url(${activeSong ? activeSong.al.picUrl : 'http://s4.music.126.net/style/web2/img/default/default_album.jpg'})` }}>
              {activeSong ? <a href={`#/song?id=${activeSong.id}`}> </a> : ''}
            </div>
            <div className="play-progress">
              <p className="song-info">
                {activeSong ? <a className='song-name' href={`#/song?id=${activeSong.id}`}>{activeSong.name}</a> : ''}
                {activeSong && activeSong.ar.map((it: artists, index: number) => {
                  if (index === 0) {
                    return <a className='singer-item' key={index} href={"#/artist?id=" + it.id}>{it.name}</a>
                  } else {
                    return <a className='singer-item' key={index} href={"#/artist?id=" + it.id}>{"/" + it.name}</a>
                  }
                })}
              </p>
              <div className="progress">
                <Progress percent={percentNum} showInfo={false} trailColor='rgb(25,25,25)' strokeColor='rgb(83,83,83)' />
                <Slider className='progress-slider' tooltipVisible={false} value={currentNum} onChange={this.onSliderChange} />
                <div className="play-time">
                  <span className='current-time'>{currentTime}</span>/<span className='duration-time'>{durationTime}</span>
                </div>
              </div>
            </div>
            <div className="play-opera-icon">
              <p className='oper-item' title='收藏'><MyIcon type='iconshoucang_bar' /></p>
              <p className='oper-item' title='分享'><MyIcon type='iconfenxiang_bar' /></p>
              <Divider type='vertical' />
              <div className='oper-item volume'>

                <MyIcon type='iconlaba' onClick={this.showVolume} />

                <div className="volumn-bar" style={{ visibility: showVolume ? 'visible' : 'hidden' }}>
                  <Slider
                    vertical
                    className='change-volume'
                    value={initVolume}
                    onChange={(value: number) => this.onChangeVolue(value)}
                  />
                </div>
              </div>
              <p className='oper-item'
                title={playModel === 'loop' ? '单曲循环' : playModel === 'random' ? '随机播放' : '循环播放'}
              >
                <MyIcon
                  onClick={this.changePlayModel}
                  type={playModel === 'loop' ? 'icondanquxunhuan' : playModel === 'random' ? 'iconsuijibofang' : 'iconxunhuanbofang'}
                />
              </p>
              <p className='oper-item play-list' title='播放列表'>
                <MyIcon type='iconbflb' />
                <span className='play-list-num'>{this.state.songLists.length}</span>
              </p>
            </div>
          </div>
          <div className="play-lock" ><MyIcon onClick={this.changeLockStatus} type={lockStatus ? 'iconsuokai' : 'iconsuoguan'} /></div>
        </div>

      </div>
    )
  }

  private showVolume = () => {
    let show = this.state.showVolume
    this.setState({ showVolume: !show })
  }

  private onChangeVolue(value: number) {
    // 修改音量
    let playEle = this.state.playEle
    if (playEle) {
      let volume = value / 100
      playEle.volume = volume
      this.setState({ initVolume: value })
    }

  }

  private changePlayModel() {
    // 改变播放模式
    let model = this.state.playModel
    let modelNew = ''
    switch (model) {
      case 'loop':
        modelNew = 'order';
        break;
      case 'order':
        modelNew = 'random';
        break;
      case 'random':
        modelNew = 'loop';
        break;
      default:
        break;
    }
    this.setState({ playModel: modelNew })
  }

  private onSliderChange = (value: number) => {
    // 进度条变动
    let playEle = this.state.playEle
    if (playEle) {
      let current = value * playEle.duration / 100
      playEle.currentTime = current
      let ct = this.dealSongTime(current)
      this.setState({ currentNum: value, currentTime: ct })
    }

  }

  private changeLockStatus() {
    // 锁定/解锁播放栏
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

  private playLastSong() {
    // 上一曲
    const { playIndex, songLists, activeSong, playModel } = this.state
    if (songLists.length && activeSong) {
      switch (playModel) {
        case 'random':
          let index = Math.floor(Math.random() * songLists.length)
          this.playIndexSong(songLists, index)
          break;
        default:
          if (playIndex === 0) {
            this.playIndexSong(songLists, songLists.length - 1)
          } else {
            this.playIndexSong(songLists, playIndex - 1)
          }
          break
      }

    }

  }

  private playNextSong() {
    // 下一曲
    const { playIndex, songLists, activeSong, playModel } = this.state
    if (songLists.length && activeSong) {
      switch (playModel) {
        case 'random':
          let index = Math.floor(Math.random() * songLists.length)
          this.playIndexSong(songLists, index)
          break;
        default:
          if (playIndex === songLists.length - 1) {
            this.playIndexSong(songLists, 0)
          } else {
            this.playIndexSong(songLists, playIndex + 1)
          }
          break
      }

    }
  }

  private changePlayStatus() {
    // 音乐播放/暂停
    const { playStatus, songLists, activeSong, playEle } = this.state
    if (!songLists.length && !activeSong) {
      return
    }
    if (activeSong) { //此时有正在播放的歌曲
      playStatus ? playEle.pause() : playEle.play()
      this.setState({ playStatus: !playStatus }) //改变播放状态
    } else {
      // 无正在播放的歌曲但歌单里有歌曲,并且只有播放时才会触发,播放第一手
      this.playIndexSong(songLists, 0)
    }
  }

  private playIndexSong(songLists: any, index: number) {
    //播放歌单第index首歌曲
    let songInfo = songLists[index]
    this.setState({ playIndex: index, playStatus: false, percentNum: 0 }, () => {
      // playIndex:播放的歌曲第几首的下标
      setTimeout(() => {
        this.playSong(songInfo)
      }, 1000)

    })
  }

  private setLoadBar() {
    // 设置加载条
    let { loadedInter } = this.state
    if (loadedInter) {
      clearInterval(loadedInter)
      this.setState({ loadedInter: null })
    }
    let inter = setInterval(() => {
      let num = this.state.percentNum

      num += 10
      this.setState({ percentNum: num })
      if (num >= 100) {
        clearInterval(inter)
      }
    }, 1000)
    this.setState({ loadedInter: inter })
  }

  private setProgressBar() {
    // 设置进度条
    let { progressInter, playEle } = this.state
    let duration = playEle.duration
    if (progressInter) {
      clearInterval(progressInter)
      this.setState({ progressInter: null })
    }
    let inter = setInterval(() => {
      let currentTime = playEle.currentTime
      let num = currentTime * 100 / duration
      let ct = this.dealSongTime(currentTime)
      this.setState({ currentNum: num, currentTime: ct })
      if (currentTime === duration) {
        clearInterval(inter)
      }
    }, 1000)
    let time = this.dealSongTime(duration)
    this.setState({ progressInter: inter, durationTime: time })
  }

  // 歌曲时间处理
  private dealSongTime(data: number) {
    let time = null
    let minutes = parseInt((data / 60) as any);
    let seconds = Math.ceil(data % 60);
    time = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
    return time
  }

  private playSong(songInfo: any) {
    let playEle = this.state.playEle
    if (playEle) {
      playEle.pause()
    }
    // 播放歌曲
    pageApi.querySongUrl({ id: songInfo.id }).then(res => {
      let url = res.data.data[0].url
      if (url) {
        let mp3: any = document.createElement('audio')
        mp3.id = 'audio'
        mp3.src = url
        mp3.play()
        mp3.onplay = () => {
          this.setLoadBar()
          this.setState({ initVolume: mp3.volume * 100 })
        }

        mp3.onended = () => {
          const { playIndex, songLists, playModel } = this.state
          this.setState({ playStatus: false }, () => {

            switch (playModel) {
              case 'loop':
                // 单曲循环模式
                setTimeout(() => {
                  mp3.currentTime = 0
                  mp3.play();
                  this.setState({ playStatus: true })
                }, 1000)
                break;
              case 'random':
                // 随机播放
                if (songLists.length) {
                  let index = Math.floor(Math.random() * songLists.length)
                  this.playIndexSong(songLists, index)
                } else {
                  this.setState({ playEle: null, activeSong: null })
                }
                break;
              case 'order':
                //顺序播放
                if (songLists.length) {
                  if (playIndex === songLists.length - 1) {
                    this.playIndexSong(songLists, 0)
                  } else {
                    this.playIndexSong(songLists, playIndex + 1)
                  }
                } else {
                  this.setState({ playEle: null, activeSong: null })
                }
                break;
              default: break
            }

          })
        }
        this.setState({ playEle: mp3, activeSong: songInfo, playStatus: true }, () => {
          mp3.oncanplay = () => {
            this.setProgressBar()
          }
        })
      } else {
        message.warning('暂无播放地址!')
      }

    })
  }


  // 监听store变化
  private onStoreChange() {
    this.setState(
      { ...store.getState().songLists }, () => {
        const { play, willPlayIndex, songLists } = this.state
        if (play) {
          //点击播放触发
          this.playIndexSong(songLists, willPlayIndex)
        }
      }
    )
  }
}


interface artists {
  name: string
  id: number
  img1v1Url: string
}


export default withRouter(AppFooter)
