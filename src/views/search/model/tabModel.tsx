import React, { Component } from "react";
// import { RouteComponentProps } from "react-router";

import { Spin, List } from 'antd'








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

    public componentDidMount() {
        console.log(this.state.type)
    }

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

                                title={<a href="https://ant.design">{item.name}</a>}
                                description={
                                    <div className='song-item'>
                                        
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



}

interface componentInter {
    type: number
    data: []
}

export default PageModel;
