import React, { Component } from "react";
import "./Page.scss";
import { RouteComponentProps } from "react-router";

class PageVisit extends Component<IAllTrendProps, any> {
  constructor(props: IAllTrendProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {}

  public render() {
    return (
      <div className="page-product-attrs">
        111111111
      </div>
    );
  }
}

interface IAllTrendProps extends RouteComponentProps { }
export default PageVisit;
