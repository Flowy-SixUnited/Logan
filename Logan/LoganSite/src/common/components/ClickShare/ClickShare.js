import "antd/dist/reset.css";
import React, { Component } from "react";
import { message, Button } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import Clipboard from "clipboard";

let lastSuccTime = Date.now();

class ClickShare extends Component {
  state = {
    clipboard: null
  };

  render() {
    const { buttonId, shareUrl, buttonStyle, icon, buttonText } = this.props;
    const defaultButtonStyle = {
      color: "#fff",
      backgroundColor: "#52c41a"
    };
    return (
      <Button
        id={buttonId}
        data-clipboard-text={shareUrl}
        style={buttonStyle || defaultButtonStyle}
      >
        {icon === false ? "" : <ShareAltOutlined />}
        {buttonText}
      </Button>
    );
  }

  componentDidMount() {
    const clipboard = new Clipboard("#" + this.props.buttonId);
    clipboard.on("success", () => {
      if (Date.now() - lastSuccTime > 1000) {
        message.success("链接已复制到剪贴板", 2);
        lastSuccTime = Date.now();
      }
    });
    this.setState({ clipboard });
  }

  componentWillUnmount() {
    this.state.clipboard && this.state.clipboard.destroy();
  }
}

export default ClickShare;