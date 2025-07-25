import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Input, Select, DatePicker, Layout, Button, message, Space } from "antd";
import { 
  CloseCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./style.scss";
import ClickShare from "../../../../../common/components/ClickShare/ClickShare";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Header } = Layout;

class HeaderBar extends Component {
  static propTypes = {
    filterConditions: PropTypes.object,
    updateFilterConditions: PropTypes.func,
    fetchTasks: PropTypes.func,
    type: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string
  };

  static defaultProps = {
    filterConditions: {
      deviceId: "",
      platform: 0,
      beginTime: moment().startOf("week"),
      endTime: moment().startOf("day")
    },
    updateFilterConditions: null,
    fetchTasks: null
  };

  render() {
    const { filterConditions, type } = this.props;
    return (
      <Header className="header">
        <div className="tasklist-filterbar-container">
          <Space.Compact className="filterbar-group">
            {
              type === "native" &&
              <Select
                data-test="platform-selector"
                value={filterConditions.platform}
                onChange={this.handlePlatformChange}
                style={{ minWidth: "100px" }}
              >
                <Option value={0}>全部平台</Option>
                <Option value={1}>Android</Option>
                <Option value={2}>iOS</Option>
              </Select>
            }
            <RangePicker
              data-test="range-picker"
              allowClear={false}
              format="YYYY-MM-DD"
              placeholder={["起始时间", "结束时间"]}
              onChange={this.handleTimeRangeChange}
              value={[moment(filterConditions.beginTime), moment(filterConditions.endTime)]}
              style={{ minWidth: "240px" }}
            />
            <Input
              data-test="deviceId-input"
              className="filter-input"
              placeholder="设备编号"
              value={filterConditions.deviceId}
              onChange={this.handleDeviceIdChange}
              suffix={
                filterConditions.deviceId ? (
                  <CloseCircleOutlined  // 
                    data-test="clean-deviceId-icon"
                    className="empty-search"
                    key="empty-search"
                    onClick={this.handleCleanDeviceId}
                  />
                ) : (
                  <span />
                )
              }
            />
          </Space.Compact>
          <Button data-test="search-button" icon={<SearchOutlined />} type="primary" onClick={this.handleSearch}>
            搜索
          </Button>
        </div>
        <ClickShare buttonId={"share-button"} shareUrl={this.composeShareUrl()} buttonText={"分享"} />
      </Header>
    );
  }

  composeShareUrl = () => {
    const { filterConditions, type, pathname } = this.props;
    if (type === "native") {
      return `${window.location.origin}${pathname}?deviceId=${filterConditions.deviceId}&beginTime=${moment(filterConditions.beginTime).valueOf()}&endTime=${moment(filterConditions.endTime).valueOf()}&platform=${filterConditions.platform}`;
    } else {
      return `${window.location.origin}${pathname}?deviceId=${filterConditions.deviceId}&beginTime=${moment(filterConditions.beginTime).valueOf()}&endTime=${moment(filterConditions.endTime).valueOf()}`;
    }
  };

  // event handlers
  handleSearch = () => {
    const { filterConditions, fetchTasks, type } = this.props;
    if (filterConditions.deviceId === "") {
      message.error("必须填写设备编号才能进行查询！");
      return;
    }
    if (type === "native") {
      fetchTasks({
        deviceId: filterConditions.deviceId,
        platform: filterConditions.platform,
        beginTime: moment(filterConditions.beginTime).valueOf(),
        endTime: moment(filterConditions.endTime).valueOf()
      });
    } else {
      fetchTasks({
        deviceId: filterConditions.deviceId,
        beginTime: moment(filterConditions.beginTime).valueOf(),
        endTime: moment(filterConditions.endTime).valueOf()
      });
    }
  };

  handleDeviceIdChange = e => {
    const { filterConditions, updateFilterConditions } = this.props;
    updateFilterConditions({
      ...filterConditions,
      deviceId: e.target.value
    });
  };

  handleCleanDeviceId = () => {
    const { filterConditions, updateFilterConditions } = this.props;
    updateFilterConditions({
      ...filterConditions,
      deviceId: ""
    });
  };

  handlePlatformChange = value => {
    const { filterConditions, updateFilterConditions } = this.props;
    updateFilterConditions({
      ...filterConditions,
      platform: value
    });
  };

  handleTimeRangeChange = value => {
    const { filterConditions, updateFilterConditions } = this.props;
    const [beginMoment, endMoment] = value;
    if (endMoment.diff(beginMoment) >= 7 * 86400000) {
      message.warning("请保证选择的时间范围不超过7天");
      return;
    }
    updateFilterConditions({
      ...filterConditions,
      beginTime: beginMoment.valueOf(),
      endTime: endMoment.valueOf()
    });
  };
}

function HeaderBarWithLocation(props) {
  const location = useLocation();
  return <HeaderBar {...props} pathname={location.pathname} search={location.search} hash={location.hash} />;
}

export default HeaderBarWithLocation;