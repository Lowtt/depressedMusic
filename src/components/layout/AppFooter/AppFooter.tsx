import React, { Component, ReactNode } from 'react'
import { RouteComponentProps,withRouter } from "react-router";


import './AppFooter.scss'

class AppFooter extends Component<RouteComponentProps, any> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      
    }
  }

  public componentDidMount() {
   
  }

  render() {
    const {  } = this.state
    return (
      <div className="app-footer">

     
      </div>
    )
  }


}



export default withRouter(AppFooter)
