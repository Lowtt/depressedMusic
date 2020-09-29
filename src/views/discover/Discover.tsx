import React, { Component } from "react";
import "./Discover.scss";
import { RouteComponentProps } from "react-router";

import NavBar from '../../components/navBar'

class PageVisit extends Component<IAllTrendProps, any> {
  constructor(props: IAllTrendProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {}

  public render() {
    return (
      <div className="page-discover">
        <NavBar activeKey={0}/>
      </div>
    );
  }
}

interface IAllTrendProps extends RouteComponentProps { }
export default PageVisit;
