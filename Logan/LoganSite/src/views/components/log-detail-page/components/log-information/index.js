import React, { Component } from "react";
import { Collapse } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import moment from "moment";
import numeral from "numeral";
import "antd/dist/reset.css";
import "./style.scss";

const { Panel } = Collapse;

class LogInformation extends Component {
  render() {
    const { logInfo, type } = this.props;
    
    if (type === "native") {
      const panelHeader = (
        <span>
          <span style={{ maxWidth: "120px", textOverflow: "ellipsis", margin: "20px 0"}}>【{ logInfo && logInfo.unionId }】</span>
          <span>日志基本信息</span>
        </span>
      )
      return (
        <Collapse
          bordered={false}
          accordion
          className="log-report-detail"
          items={[
            {
              key: "1",
              label: panelHeader,
              children: (
                <>
                  <p>任务ID：{logInfo && logInfo.taskId}</p>
                  <p>AppId: {logInfo && logInfo.appId}</p>
                  <p>AppVersion: {logInfo && logInfo.appVersion}</p>
                  <p>UnionId: {logInfo && logInfo.unionId}</p>
                  <p>设备平台：{logInfo && this.platformNameByPlatformId.get(logInfo.platform)}</p>
                  <p>设备标识：{logInfo && logInfo.deviceId}</p>
                  <p>日志时间：{logInfo && moment(logInfo.logDate).format("YYYY-MM-DD")}</p>
                  <p>
                    上报时间：
                    {logInfo && moment(logInfo.addTime).format("YYYY-MM-DD HH:mm:ss.SSS")}
                  </p>
                  <p>
                    日志大小：
                    {logInfo && numeral(Number.parseInt(logInfo.amount)).format('0.00 b')}
                  </p>
                </>
              ),
            },
          ]}
        />
      );
    } else {
      const panelHeader = (
        <span>
          <span style={{ maxWidth: "120px", textOverflow: "ellipsis", margin: "20px 0"}}>【{ logInfo && logInfo.deviceId }】</span>
          <span>日志基本信息</span>
        </span>
      )
      return (
        <Collapse
          bordered={false}
          accordion
          className="log-report-detail"
          items={[
            {
              key: "1",
              label: panelHeader,
              children: (
                <>
                  <p>设备标识：{logInfo && logInfo.deviceId}</p>
                  <p>来源：{logInfo && logInfo.webSource}</p>
                  <p>环境信息：{logInfo && logInfo.environment}</p>
                  <p>日志时间：{moment(logInfo && logInfo.addTime).format("YYYY-MM-DD HH:mm:ss")}</p>
                  <p>日志所属天：{moment(logInfo && logInfo.logDate).format("YYYY-MM-DD")}</p>
                  <p>自定义信息：{logInfo && logInfo.customReportInfo}</p>
                </>
              ),
            },
          ]}
        />
      );
    }

  }

  get platformNameByPlatformId() {
    const platformNameByPlatformId = new Map();
    platformNameByPlatformId.set(-1, "Unknown");
    platformNameByPlatformId.set(
      0,
      <span>
        <AppleOutlined /> | <AndroidOutlined />
      </span>
    );
    platformNameByPlatformId.set(
      1,
      <span>
        <AndroidOutlined />
      </span>
    );
    platformNameByPlatformId.set(
      2,
      <span>
        <AppleOutlined />
      </span>
    );
    return platformNameByPlatformId;
  }
}

export default LogInformation;
