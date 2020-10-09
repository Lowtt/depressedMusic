import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Input, Tabs } from 'antd';
import qs from 'query-string'

import "./Search.scss";

const { Search } = Input
const { TabPane } = Tabs;

// import pageApi from '../../api/discoverApi'

class PageSearch extends Component<IAllTrendProps, any> {
  constructor(props: IAllTrendProps) {
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
      }]
    };
  }

  public componentDidMount() {

  }

  public render() {
    const { title, tabData } = this.state
    return (
      <div className="page-search">
        <div className="search-bar">
          <Search onSearch={this.search.bind(this)} />
        </div>
        <div className="search-content">
          <p className="title">搜索"{title}",找到{}</p>

          <div className="search-list">
            <Tabs defaultActiveKey="1" type="card" size='large'>
              {tabData.map((item: tabItem) => {
                return (
                  <TabPane tab={item.name} key={item.type + ''}>
                    Content of card tab 1
                  </TabPane>
                )
              })}

            </Tabs>
          </div>
        </div>
      </div>
    );
  }
  private search(val: string) {
    console.log(val)
  }

}


interface IAllTrendProps extends RouteComponentProps { }

interface tabItem {
  name: string
  type: number

}
interface hotItem {
  name: string
  picUrl: string
  playCount: number
  id: number
}
export default PageSearch;
