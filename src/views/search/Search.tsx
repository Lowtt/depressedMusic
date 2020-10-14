import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Input, Tabs } from 'antd';
import qs from 'query-string'

import "./Search.scss";
import TabContent from './model/tabModel'
import pageApi from '../../api/searchApi'
const { Search } = Input
const { TabPane } = Tabs;



class PageSearch extends Component<RouteComponentProps, any> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      title: qs.parse(this.props.history.location.search).value,
      tabData: [{
        name: '单曲',
        type: 1
      }, {
        name: '歌手',
        type: 100
      }, {
        name: '专辑',
        type: 10
      }, {
        name: '视频',
        type: 1014
      }, {
        name: '歌词',
        type: 1006
      }, {
        name: '歌单',
        type: 1000
      }, {
        name: '主播电台',
        type: 1009
      }, {
        name: '用户',
        type: 1002
      }],
      activeKey: '1',//面板激活的key
      displayData: {},//展示的数据
      unit: {
        "1": ' 首歌曲',
        "100": " 个歌手",
        "10": " 张专辑",
        "1014": " 个视频",
        "1006": " 个歌词",
        "1000": " 个歌单",
        "1009": " 个节目",
        "1002": " 个用户"
      },

    };
  }


  public componentDidMount() {
    const { title, activeKey } = this.state
    this.getSearchResult(+activeKey, title)
  }

  public render() {
    const { title, tabData, activeKey, displayData, unit } = this.state
    return (
      <div className="page-search">
        <div className="search-bar">
          <Search defaultValue={title} onSearch={this.search.bind(this)} />
        </div>
        <div className="search-content">
          <p className="title">搜索"{title}",找到 <span style={{ color: 'rgb(194,12,12)' }}>{displayData.songCount > 19 ? 20 : displayData.songCount}</span>{unit[activeKey]}</p>
          <div className="search-list">
            <Tabs defaultActiveKey="1" type="card" size='large' onChange={this.tabChange.bind(this)}>
              {tabData.map((item: tabItem) => {
                return (
                  <TabPane tab={item.name} key={item.type + ''}>
                    {+activeKey === item.type ? <TabContent type={item.type} data={displayData.songs} /> : null}
                  </TabPane>
                )
              })}

            </Tabs>
          </div>
        </div>
      </div>
    );
  }
  // 搜索歌曲
  private search(val: string) {
    this.props.history.push('/search?value=' + val)
    let { activeKey } = this.state
    this.getSearchResult(+activeKey, val)
  }
  // 面板切换时触发
  private tabChange(key: string) {
    let { title } = this.state
    this.getSearchResult(+key, title)
  }

  // 获取搜索结果
  private getSearchResult(type: number, key: string) {
    const param = {
      keywords: key,
      type: type,
      // limit: 20
    }
    pageApi.query(param).then(res => {
      this.setState({ title: key, displayData: res.data.result, activeKey: type + '' })
    })
  }

}


// interface IAllTrendProps extends RouteComponentProps { }

interface tabItem {
  name: string
  type: number

}

export default PageSearch;
