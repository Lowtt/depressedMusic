import React, { Component } from "react";
// import { RouteComponentProps } from "react-router";

import { List } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';

import store from '../../../store'
import action from '../../../store/model/playSong/actionCreators'


const MyIcon = createFromIconfontCN({
    scriptUrl: (window as any).ICON_URL
});



class PageModel extends Component<componentInter, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            type: this.props.type,
        };

    }
    public shouldComponentUpdate(nexPros: any) {
        if (this.props.data !== nexPros.data) {
            return true
        }
        return false
    }

    public componentDidMount() { }

    public render() {
        const { type } = this.state
        // const {}
        return (
            <div className="page-tab-content">
                {this.createSongs(type)}
            </div>
        );
    }

    private createSongs(type: number) {
        let ele = null
        switch (type) {
            case 1:
                ele = <List

                    dataSource={this.props.data}
                    renderItem={(item: any) => (
                        <List.Item>
                            <List.Item.Meta
                                description={
                                    <div className='song-item'>
                                        <span className="play" title='播放'><MyIcon onClick={() => this.playSong(item)} type='iconbofang_active_huaban' /></span>
                                        <p className='song-name'>
                                            <a className='real-name' href={`#/song?id=${item.id}`} title={item.name + item.alia.map((it: string, idx: number) => {
                                                if (idx === 0) {
                                                    return ' - ' + it
                                                }
                                                return '/' + it
                                            })}>{item.name}</a>
                                            <span className='alias'>{item.alia.map((it: string, idx: number) => {
                                                if (idx === 0) {
                                                    return ' - ' + it
                                                }
                                                return '/' + it
                                            })}</span>
                                        </p>
                                        <p className="song-oper">
                                            <span className='oper-item' title='添加到播放列表'><MyIcon onClick={() => this.addSong(item)} type='iconjiahao' /></span>
                                            <span className='oper-item' title='收藏'><MyIcon type='iconshoucang' /></span>
                                            <span className='oper-item' title='分享'><MyIcon type='iconfenxiang' /></span>
                                            <span className='oper-item' title='下载'><MyIcon type='iconxiazai' /></span>
                                        </p>
                                        <p className='singer'>{item.ar.map((it: artists, index: number) => {
                                            if (index === 0) {
                                                return <a className='singer-item' key={index} href={"/artist?id=" + it.id}>{it.name}</a>
                                            } else {
                                                return <a className='singer-item' key={index} href={"/artist?id=" + it.id}>{"/" + it.name}</a>
                                            }
                                        })}</p>
                                        <p className='album'><a title={item.al.name} href={"/album?id=" + item.al.id}>《{item.al.name}》</a> </p>
                                        <p className="time">{this.dealSongTime(item.dt)}</p>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
                break;
            default: break
        }


        return ele
    }

    // 歌曲时间处理
    private dealSongTime(data: number) {
        let time = null

        var minutes = parseInt((data / (1000 * 60)) as any);
        var seconds = Math.ceil((data % (1000 * 60)) / 1000);
        time = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
        return time
    }

    //添加歌曲歌曲
    private addSong(songInfo: any) {
        let addSong = action.addSongAction(songInfo)
        store.dispatch(addSong)
    }

    private playSong(songInfo:any){
        let playSong = action.playSongAction(songInfo)
        store.dispatch(playSong)
    }



}

interface componentInter {
    type: number
    data: []
}

interface artists {
    name: string
    id: number
    img1v1Url: string
}

export default PageModel;
