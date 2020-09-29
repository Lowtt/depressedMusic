import React, { Fragment, Suspense } from 'react';
import { hot } from "react-hot-loader/root";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { Spin, Layout } from "antd";
import routes from "./config/routes";


import './App.scss';
import AppHeader from "./components/layout/AppHeader";
const { Header, Footer, Content } = Layout;
function App() {
  return (
    <HashRouter>
      <Fragment>
        <Layout>
          <Header>
            <AppHeader />
          </Header>
          <Content>
            <Suspense fallback={<Spin className="page-spin"></Spin>}>
              <Switch>
                {routes.map((item) => {
                  return <Route exact key={item.view} {...item} />;
                })}
                <Redirect path="/" to={{ pathname: "/discover" }} />
              </Switch>
            </Suspense>
          </Content>
          <Footer>这是尾部</Footer>
        </Layout>
      </Fragment>
    </HashRouter>
  );
}

export default hot(App);
