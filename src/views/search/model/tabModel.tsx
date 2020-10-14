import React, { Component } from "react";
// import { RouteComponentProps } from "react-router";

import { List } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import pageApi from '../../../api/searchApi'

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
                                        <span className="play" title='播放'><MyIcon onClick={() => this.playSong(item.id)} type='iconbofang_active_huaban' /></span>
                                        <p className='song-name'>
                                            <a className='real-name' href={`/song?id=${item.id}`} title={item.name + item.alias.map((it: string, idx: number) => {
                                                if (idx === 0) {
                                                    return ' - ' + it
                                                }
                                                return '/' + it
                                            })}>{item.name}</a>
                                            <span className='alias'>{item.alias.map((it: string, idx: number) => {
                                                if (idx === 0) {
                                                    return ' - ' + it
                                                }
                                                return '/' + it
                                            })}</span>
                                        </p>
                                        <p className="song-oper">
                                            <span className='oper-item' title='添加到播放列表'><MyIcon type='iconjiahao' /></span>
                                            <span className='oper-item' title='收藏'><MyIcon type='iconshoucang' /></span>
                                            <span className='oper-item' title='分享'><MyIcon type='iconfenxiang' /></span>
                                            <span className='oper-item' title='下载'><MyIcon type='iconxiazai' /></span>
                                        </p>
                                        <p className='singer'>{item.artists.map((it: { name: string, id: number }, index: number) => {
                                            if (index === 0) {
                                                return <a className='singer-item' key={it.id} href={"/artist?id=" + it.id}>{it.name}</a>
                                            } else {
                                                return <a className='singer-item' key={it.id} href={"/artist?id=" + it.id}>{"/" + it.name}</a>
                                            }
                                        })}</p>
                                        <p className='album'><a title={item.album.name} href={"/album?id=" + item.album.id}>《{item.album.name}》</a> </p>
                                        <p className="time">{this.dealSongTime(item.duration)}</p>
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
        
        var minutes = parseInt((data  / (1000 * 60)) as any);
        var seconds = Math.round((data % (1000 * 60)) / 1000);
        time = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds)
        return time
    }

    //播放歌曲
    private playSong(id: number) {
        pageApi.querySongUrl({ id: id }).then(res => {
            let url = res.data.data[0].url
            let ele = document.getElementById('audio')
            ele && ele.remove()
            let mp3: any = document.createElement('audio')
            mp3.id = 'audio'
            mp3.src = url
            mp3.play()
            mp3.onended = function () {
                this.remove()
            }
        })
    }

}

interface componentInter {
    type: number
    data: []
}

export default PageModel;
