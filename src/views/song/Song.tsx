import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { message } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import qs from 'query-string'

import "./Song.scss";
import NavBar from '../../components/navBar'
import pageApi from '../../api/songApi'
import store from '../../store'
import action from '../../store/model/playSong/actionCreators'

const MyIcon = createFromIconfontCN({
    scriptUrl: (window as any).ICON_URL
});


class PageSong extends Component<RouteComponentProps, any> {
    
    constructor(props: RouteComponentProps) {
        super(props);
        // const [songDetail,setSongDetail] = useState({})
        this.state = {
            songId: qs.parse(this.props.history.location.search).id,//歌曲id
            songDetail: {},//歌曲详情
            param: {
                offset: 0,//歌曲评论默认偏移量,
                limit: 20,//默认限制
            },
            songComment: {},//歌曲评论
            lyric: '',//歌词
            showAll: false,//展开/收起歌词标识

        };
      
        this.playSong = this.playSong.bind(this)
        this.addSong = this.addSong.bind(this)
    }


    public componentDidMount() {
        this.querySongDetail()
        this.queryComment()
        this.queryLyric()
    }

    public render() {
        const { songId, songDetail, songComment, lyric, showAll } = this.state
        return (
            <div className="page-song">
                <NavBar activeKey={0} />
                <div className="song-content">
                    <div className="song-detail">
                        <div className="song-info">
                            <div className="song-img">
                                <div className="img">
                                    <img src={songDetail.al?.picUrl} alt={songDetail.al?.name} width='130' height='130' />
                                    <div className="bac-img"></div>
                                </div>
                                <div className="out-link">
                                    <MyIcon type='iconiconfontyuleyinle' />
                                    <a href={"https://music.163.com/#/outchain/2/" + songId}
                                        rel="noopener noreferrer"
                                        target='_blank' className='to-link'
                                    > 生成外链播放器</a>
                                </div>
                            </div>
                            <div className="song-intro">
                                <div className="song-header">
                                    <div className="title">
                                        <i className="icon tag"></i>
                                        <span className='main-title'>{songDetail.name}</span>
                                        {songDetail.mv ? <a href={"#/mv?id=" + songDetail.mv} className='mv' title='播放mv'><i className="icon mv-icon" ></i></a> : ''}
                                        <p className="sub-title">{songDetail.alia && songDetail.alia.length ? songDetail.alia[0] : ''}</p>
                                    </div>
                                    <div className="song-singer">
                                        <p className="artist">歌手：{songDetail.ar && songDetail.ar.map((item: singerItem, index: number) => {

                                            return (<span key={item.id}>{index === 0 ? '' : ' / '}<a className='songer' href={'#/artis?id=' + item.id}>{item.name}</a></span>)

                                        })}</p>
                                        <p className="album">
                                            所属专辑：<a href={'#/album?id=' + songDetail.al?.id}>{songDetail.al?.name}</a>
                                        </p>
                                    </div>
                                    <div className="song-btns">
                                        <p className="btn">
                                            <span className="lb bt" title='播放' onClick={this.playSong}><MyIcon type='iconbofang_song' /> 播放</span>
                                            <span className="rb bt" title='添加到播放列表' onClick={this.addSong}><MyIcon type='iconadd' /></span>
                                        </p>
                                        <p className="btn">
                                            <span className='bt'><MyIcon type='iconshoucang' /> 收藏</span>
                                        </p>
                                        <p className="btn">
                                            <span className='bt'><MyIcon type='iconfenxiang' /> 分享</span>
                                        </p>
                                        <p className="btn">
                                            <span className='bt'><MyIcon type='iconxiazai' /> 下载</span>
                                        </p>
                                        <p className="btn">
                                            <span className='bt c-bt' onClick={() => this.scrollToAnchor('songComment')}><MyIcon type='iconpinglun' /> ({songComment.total})</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="lyric-content">
                                    <div
                                        className='lyric'
                                        dangerouslySetInnerHTML={{ __html: lyric }}
                                        style={{ height: showAll ? 'auto' : '327px' }}
                                    ></div>
                                    <p className="show-lyric" onClick={this.changeShowStatus.bind(this)}>
                                        <span className='tip'>{showAll ? '收起' : '展开'}</span>
                                        <MyIcon type={showAll ? 'iconshouqi' : 'iconzhankai'} />
                                    </p>
                                    <p className="error">
                                        <a href={"https://music.163.com/#/lyric/report?id=" + songId} target='_blank' rel="noopener noreferrer">报错</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="song-comment" id='songComment'>
                            <div className="comment-title">
                                <span className="main-title">评论</span>
                                <span className="sub-title">共{songComment.total}条评论</span>
                            </div>
                        </div>
                    </div>
                    <div className="song-recommand"></div>
                </div>

            </div>
        );
    }

    private scrollToAnchor(anchorName: string) {
        // 锚跳转
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView()
            }
        }
    }

    private changeShowStatus() {
        // 切换歌词展开状态
        let show = this.state.showAll
        this.setState({ showAll: !show })
    }

    private playSong() {
        // 播放歌曲
        let songDetail = this.state.songDetail
        if (songDetail.name) {
            let playSong = action.playSongAction(songDetail)
            store.dispatch(playSong)
        }
    }

    private addSong() {
        // 添加歌曲
        let songDetail = this.state.songDetail
        if (songDetail.name) {
            let addSong = action.addSongAction(songDetail)
            store.dispatch(addSong)
        }
    }

    private querySongDetail() {
        // 查询歌曲详情
        pageApi.queryDetail({ id: this.state.songId }).then(res => {
            let data = res.data.songs
            if (data.length) {
                this.setState({ songDetail: data[0] })
            } else {
                message.warning('暂无该歌曲信息,请重新搜索!')
            }
        })
    }

    private queryLyric() {
        // 获取歌词
        pageApi.queryLyric({ id: this.state.songId }).then(res => {
            let reg = /\[[^\]]+\]/g //匹配歌词中的时间
            let str = res.data.lrc.lyric
            let lyric = str && str.replace(reg, '<br/>')
            this.setState({ lyric })
        })
    }

    private queryComment() {
        // 获取评论
        const { param, songId } = this.state
        pageApi.queryComment({
            ...param,
            id: songId
        }).then(res => {
            let obj = {
                hotComments: res.data.hotComments,
                comments: res.data.comments,
                total: res.data.total
            }
            this.setState({ songComment: obj })
        })
    }


}


// interface IAllTrendProps extends RouteComponentProps { }

interface singerItem {
    name: string
    id: number

}

export default PageSong;
