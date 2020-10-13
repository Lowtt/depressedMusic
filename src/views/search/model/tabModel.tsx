import React, { Component } from "react";
// import { RouteComponentProps } from "react-router";

import {  List } from 'antd'
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
                        <List.Item onClick={() => this.playSong(item.id)}>
                            <List.Item.Meta

                                // title={<a href="https://ant.design">{item.name}</a>}

                                description={
                                    <div className='song-item'>
                                        <p className='song-name'><MyIcon type='iconbofang_huaban'/>{item.name}</p>
                                        <p className='singer'>{item.artists.map((it: { name: string }, index: number) => {
                                            if (index === 0) {
                                                return it.name
                                            } else {
                                                return "/" + it.name
                                            }
                                        })}</p>
                                        <p className='album'>《{item.album.name}》</p>
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
