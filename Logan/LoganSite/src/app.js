import React, { Component } from "react";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import {Layout} from "antd";
import {history} from "./store";
import NativeList from "./views/native-list";
import NativeLogDetail from "./views/native-log-detail";
import WebList from "./views/web-list";
import WebLogDetail from "./views/web-detail";
import Sider from "./common/components/Sider/Sider";
import "antd/dist/reset.css";
import "./app.scss";

class App extends Component {

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <Layout style={{height: "100%"}}>
            <Sider/>
            <div className="app">
              <Routes>
                <Route path="/" element={<Navigate to="/native-list" replace />} />
                <Route path="/native-list" element={<NativeList />} />
                <Route path="/native-log-detail" element={<NativeLogDetail />} />
                <Route path="/web-list" element={<WebList />} />
                <Route path="/web-detail" element={<WebLogDetail />} />
              </Routes>
            </div>
            <div>APP</div>
          </Layout>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
