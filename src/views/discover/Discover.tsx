import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Carousel, Row, Col } from 'antd';
import {
  Link
} from "react-router-dom"

import "./Discover.scss";
import NavBar from '../../components/navBar'
import pageApi from '../../api/discoverApi'

class PageVisit extends Component<IAllTrendProps, any> {
  constructor(props: IAllTrendProps) {
    super(props);
    this.state = {
      bannerData: [],//轮播图数据
      hotListData: [],//热门推荐数据
    };
  }

  public componentDidMount() {
    this.queryBanner()
    this.queryHotList()
  }

  public render() {
    const { bannerData, hotListData } = this.state
    return (
      <div className="page-discover">
        <NavBar activeKey={0} />
        <div className="banner">
          <Carousel autoplay>
            {bannerData.map((item: bannerItem) => {
              if (item.url) {
                return (
                  <div key={item.imageUrl} className="banner-item" style={{ background: `url("${item.imageUrl}")` }}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <img width='980' height='100%' src={item.imageUrl} alt={item.typeTitle} />
                    </a>
                  </div>
                )
              } else {
                return (
                  <div key={item.imageUrl} className="banner-item" style={{ background: `url("${item.imageUrl}")` }}>
                    <img src={item.imageUrl} alt={item.typeTitle} width='980' height='100%' onClick={() => this.clickBanner(item)} />
                  </div>
                )
              }
            })}
          </Carousel>
        </div>
        <div className="list-content">
          <div className="hot-area">
            <div className="header">
              <p className="ico"></p>
              <Link to={{ pathname: '/' }}><span className='first-nav'>热门推荐</span></Link>
              <div className="tab">
                <Link to={{
                  pathname: '/',
                  search: '?sort=name'
                }}>华语</Link>
                <span className='line'>|</span>
                <Link to={{
                  pathname: '/',
                  search: '?sort=name'
                }}>流行</Link>
                <span className='line'>|</span>
                <Link to={{
                  pathname: '/',
                  search: '?sort=name'
                }}>摇滚</Link>
                <span className='line'>|</span>
                <Link to={{
                  pathname: '/',
                  search: '?sort=name'
                }}>民谣</Link>
                <span className='line'>|</span>
                <Link to={{
                  pathname: '/',
                  search: '?sort=name'
                }}>电子</Link>
              </div>
              <span className="more">
                <Link to={{ pathname: '/' }}>更多&nbsp;</Link> ➜
              </span>
            </div>
            <div className="hot-content">
              <Row justify='space-between'>
                {hotListData.map((item: hotItem) => {
                  return (
                    <Col key={item.id} span={5}>
                      <div className="hot-item">
                        <div className="hot-img" style={{ backgroundImage: `url("${item.picUrl}")` }}>
                          <div className="play-tab">
                            {item.playCount > 100000 ? (item.playCount / 10000).toFixed(0) + '万' : item.playCount}
                          </div>
                        </div>
                        <p className="desc">{item.name}</p>
                      </div>

                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 轮播图点击
  private clickBanner(obj: bannerItem) {
    console.log('被点击了', obj)
  }

  // 获取轮播数据
  private queryBanner() {
    // 0: pc
    // 1: android
    // 2: iphone
    // 3: ipad
    pageApi.queryBanner({ type: 0 }).then(res => {
      this.setState({ bannerData: res.data.banners })
    })
  }

  // 获取热门推荐数据
  private queryHotList() {
    //limit:限制条数,默认30
    pageApi.queryHotList({ limit: 8 }).then(res => {
      this.setState({ hotListData: res.data.result })
    })
  }
}


interface IAllTrendProps extends RouteComponentProps { }

interface bannerItem {
  imageUrl: string
  targetId: number
  targetType: number
  url: string | null
  typeTitle: string
}
interface hotItem {
  name: string
  picUrl: string
  playCount: number
  id: number
}
export default PageVisit;
