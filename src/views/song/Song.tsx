import React, { Component, createElement } from "react";
import { RouteComponentProps } from "react-router";
import { message, Input, Button, Comment, List, Divider, Pagination } from 'antd';
import { createFromIconfontCN, LikeOutlined, LikeFilled } from '@ant-design/icons';

import qs from 'query-string'
import moment from 'moment'

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
                offset: 0,//歌曲评论默认偏移量,(当前页数-1)*limit(limit默认为20)
                limit: 20,//默认限制
            },
            songComment: { hotComments: [], comments: [] },//歌曲评论
            lyric: '',//歌词
            showAll: false,//展开/收起歌词标识
            existSong: true,//存在该歌曲?
            playlist: [],//包含这首歌歌单
            songlist: [],//相似歌曲
        };

    }


    public componentDidMount() {
        this.querySongDetail()
    }

    public render() {
        const { songId, songDetail, songComment, lyric, showAll, existSong, playlist, songlist } = this.state
        return (
            <div className="page-song">
                <NavBar activeKey={0} />
                {existSong ? <div className="song-content">
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
                                            <span className="lb bt" title='播放' onClick={() => this.playSong(songDetail)}><MyIcon type='iconbofang_song' /> 播放</span>
                                            <span className="rb bt" title='添加到播放列表' onClick={() => this.addSong(songDetail)}><MyIcon type='iconadd' /></span>
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
                            <div className="your-comment">
                                <div className="send-comment">
                                    <div className="user-img">
                                        {/* 登录 */}
                                        {/* <img src="http://p3.music.126.net/M_osm40o9ZSt9o_HPisrsA==/18594940650651691.jpg?param=50y50" alt="" /> */}
                                        <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="" width='50' height='50' />
                                    </div>
                                    <div className="ipt-area">
                                        <Input bordered={false} placeholder='评论' />
                                    </div>
                                </div>
                                <div className="btns">
                                    <span style={{ color: '#bababa', fontSize: '12px', padding: '0 10px' }}>140</span>
                                    <Button size='small' type='primary'>评论</Button>
                                </div>
                            </div>
                            {songComment.hotComments && songComment.hotComments.length ? <div className="hot-comment">
                                <p className="c-title">
                                    精彩评论
                                </p>
                                <div className="c-content">
                                    <List
                                        className="comment-list"
                                        itemLayout="horizontal"
                                        dataSource={songComment.hotComments}
                                        renderItem={(item: any) => (
                                            <li className='c-item' key={item.commentId}>
                                                <Comment
                                                    actions={[
                                                        <span>
                                                            {createElement(item.liked === 'liked' ? LikeFilled : LikeOutlined)}
                                                            <span className="comment-action">({item.likedCount})</span>
                                                        </span>,
                                                        <Divider type='vertical' />,
                                                        <span key="comment-basic-reply-to">回复</span>
                                                    ]}
                                                    author={<a className="nick-name" href={'#/user?id=' + item.user.userId}>{item.user.nickname}</a>}
                                                    avatar={item.user.avatarUrl}
                                                    content={
                                                        <div>
                                                            <p>{item.content}</p>

                                                            {item.beReplied.map((ele: any) => {
                                                                return (
                                                                    <div key={ele.beRepliedCommentId} className="required-content">
                                                                        <a className="nick-name" href={'#/user?id=' + ele.user.userId}>{ele.user.nickname}</a>：
                                                                        <span className="content">{ele.content}</span>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    }
                                                    datetime={
                                                        <span>{moment(item.time).format('YYYY-MM-DD HH:mm')}</span>
                                                    }
                                                />
                                            </li>
                                        )}
                                    />
                                </div>
                            </div> : ''}
                            <div className="new-comment">
                                <p className="c-title">
                                    最新评论({songComment.total})
                                </p>
                                <div className="c-content">
                                    <List
                                        className="comment-list"
                                        itemLayout="horizontal"
                                        dataSource={songComment.comments}
                                        renderItem={(item: any) => (
                                            <li className='c-item' key={item.commentId}>
                                                <Comment
                                                    actions={[
                                                        <span>
                                                            {createElement(item.liked === 'liked' ? LikeFilled : LikeOutlined)}
                                                            <span className="comment-action">({item.likedCount})</span>
                                                        </span>,
                                                        <Divider type='vertical' />,
                                                        <span key="comment-basic-reply-to">回复</span>
                                                    ]}
                                                    author={<a className="nick-name" href={'#/user?id=' + item.user.userId}>{item.user.nickname}</a>}
                                                    avatar={item.user.avatarUrl}
                                                    content={
                                                        <div>
                                                            <p>{item.content}</p>

                                                            {item.beReplied.map((ele: any) => {
                                                                return (
                                                                    <div key={ele.beRepliedCommentId} className="required-content">
                                                                        <a className="nick-name" href={'#/user?id=' + ele.user.userId}>{ele.user.nickname}</a>：
                                                                        <span className="content">{ele.content}</span>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    }
                                                    datetime={
                                                        <span>{moment(item.time).format('YYYY-MM-DD HH:mm')}</span>
                                                    }
                                                />
                                            </li>
                                        )}
                                    />
                                </div>
                            </div>
                            {songComment.total > 20 ? <div className="page-change">
                                <Pagination
                                    total={songComment.total}
                                    defaultPageSize={20}
                                    showSizeChanger={false}
                                    onChange={this.onPageChange}
                                    size='small'
                                />
                            </div> : ''}
                        </div>
                    </div>
                    <div className="song-recommand">
                        {playlist.length ? <div className="income-playlist">
                            <p className="in-title">
                                包含这首歌的歌单
                            </p>
                            <div className="income-content">
                                {playlist.map((item: any) => {
                                    return (
                                        <div className='playlist-item' key={item.id}>
                                            <div className="img">
                                                <a href={'#/playlist?id=' + item.id} title={item.name}><img src={item.coverImgUrl} alt="" width='50' height='50' /></a>
                                            </div>
                                            <div className="intro">
                                                <p className="l-name"><a title={item.name} href={'#/playlist?id=' + item.id}>{item.name}</a></p>
                                                <span className='by-name'>by <a href={'#/user?id=' + item.creator.userId} title={item.creator.nickname}>{item.creator.nickname}</a></span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div> : ''}
                        {songlist.length ? <div className="income-songlist">
                            <p className="in-title">
                                相似歌曲
                            </p>
                            <div className="income-content">
                                {songlist.map((item: any) => {
                                    return (
                                        <div className='songlist-item' key={item.id}>

                                            <div className="intro">
                                                <p className="song-name"><a title={item.name} href={'#/song?id=' + item.id}>{item.name}</a></p>
                                                <p className='ar-name'>
                                                    {item.ar && item.ar.map((ele: any, index: number) => {
                                                        return <span key={ele.id}>{index === 0 ? '' : '/'}<a href={'#/artisi?id=' + ele.id} title={ele.name}>{ele.name}</a></span>
                                                    })}
                                                </p>
                                            </div>
                                            <div className="btns">
                                                <span className="play" onClick={() => this.playSong(item)}><MyIcon type='iconziyuan' /></span>
                                                <span className="add" onClick={() => this.addSong(item)}><MyIcon type='iconsong_add' /></span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div> : ''}
                    </div>
                </div>
                    :
                    <div className='no-song'>404</div>
                }
            </div>
        );
    }

    private onPageChange = (pageNum: number) => {
        // 页码变动
        let param = this.state.param
        param.offset = (pageNum - 1) * param.limit
        this.setState(param, () => {
            this.queryComment()
            this.scrollToAnchor('songComment')
        })
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

    private playSong(songInfo: any) {
        // 播放歌曲


        let playSong = action.playSongAction(songInfo)
        store.dispatch(playSong)

    }

    private addSong(songInfo: any) {
        // 添加歌曲
        let addSong = action.addSongAction(songInfo)
        store.dispatch(addSong)

    }

    private querySongDetail() {
        // 查询歌曲详情
        pageApi.queryDetail({ id: this.state.songId }).then(res => {
            let data = res.data.songs
            if (data.length) {
                this.setState({ songDetail: data[0] })
                this.queryComment()
                this.queryLyric()
                this.querySimiPlaylist()
                this.querySimiSong()
            } else {
                message.warning('暂无该歌曲信息,请重新搜索!')
                this.setState({ existSong: false })
            }
        })
    }

    private queryLyric() {
        // 获取歌词
        pageApi.queryLyric({ id: this.state.songId }).then(res => {
            let reg = /\[[^\]]+\]/g //匹配歌词中的时间
            if (!res.data.nolyric) {
                let str = res.data.lrc.lyric
                let lyric = str && str.replace(reg, '<br/>')
                this.setState({ lyric })
            } else {
                this.setState({ lyric: '暂无歌词!' })
            }

        })
    }

    private querySimiPlaylist() {
        // 查询包含这首歌的歌单
        pageApi.querySimiPlaylist({ id: this.state.songId }).then(res => {
            this.setState({ playlist: res.data.playlists })
        })
    }

    private querySimiSong() {
        // 查询相似歌曲
        pageApi.querySimiSong({ id: this.state.songId }).then(res => {
            let data = res.data.songs
            let songlist = data && data.map((item: any) => {
                let obj = {
                    name: item.name,
                    id: item.id,
                    al: { picUrl: item.album.picUrl },
                    ar: item.artists
                }
                return obj
            })
            this.setState({ songlist })
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
