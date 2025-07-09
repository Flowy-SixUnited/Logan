import "antd/dist/reset.css";
import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { 
  MobileOutlined,  
  GlobalOutlined    
} from "@ant-design/icons";
import { isEqual } from "lodash";
import image from "./new_logan_logo_white.png";
import "./style.scss";

class Sider extends Component {

  state = {
    selectedKeys: ["0"]
};

  render() {
    // 定义菜单项
    const menuItems = [
      {
        key: "0",
        icon: <MobileOutlined />,
        label: "Native日志"
      },
      {
        key: "1",
        icon: <GlobalOutlined />,
        label: "Web日志"
      }
    ];
    return (
      <Layout.Sider style={style.sider} trigger={null}>
        <div>
          <div className="sider-logo" style={style.logo} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["0"]}
            selectedKeys={this.state.selectedKeys}
            onClick={this.handleMenuClick}
            items={menuItems}
          />
        </div>
      </Layout.Sider>
    );
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    if (pathname === "/native-list" || pathname === "/native-log-detail") {
      this.setState({
        selectedKeys: ["0"]
      });
    } else if (pathname === "/web-list" || pathname === "/web-detail") {
      this.setState({
        selectedKeys: ["1"]
      });
    } else {
      this.setState({
        selectedKeys: ["0"]
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextState, this.state) || !isEqual(nextProps, this.props);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pathname } = this.props.location;
    if (pathname === "/native-list" || pathname === "/native-log-detail") {
      if (this.state.selectedKeys[0] !== "0") {
        this.setState({
          selectedKeys: ["0"]
        });
      }
    } else if (pathname === "/web-list" || pathname === "/web-detail") {
      if (this.state.selectedKeys[0] !== "1") {
        this.setState({
          selectedKeys: ["1"]
        });
      }
    } else {
      if (this.state.selectedKeys[0] !== "0") {
        this.setState({
          selectedKeys: ["0"]
        });
      }
    }
  }

  handleMenuClick = ({ key }) => {
    if (key === "0") {
      this.props.navigate("/native-list");
      this.setState({
        selectedKeys: ["0"]
      });
    } else if (key === "1") {
      this.props.navigate("/web-list");
      this.setState({
        selectedKeys: ["1"]
      });
    } else {
      this.props.navigate("/native-list");
      this.setState({
        selectedKeys: ["0"]
      });
    }
  }
}

const style = {
  sider: {
    height: "100%"
  },
  logo: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: "32px",
    height: "80px",
    margin: "5px",
    cursor: "pointer"
  }
};

function SiderWithLocation(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return <Sider {...props} location={location} navigate={navigate} />;
}

export default SiderWithLocation;
