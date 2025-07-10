import React, { Component } from "react";
import { Checkbox, Row, Col, Divider, Button, Input, Radio, Dropdown } from "antd";
import { 
  CheckSquareOutlined,  
  CheckCircleOutlined,  
  ArrowUpOutlined,      
  ArrowDownOutlined,    
  CloseCircleOutlined,  
  SearchOutlined        
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./style.scss";
import {nativeLogTypeConfigs, webLogTypeConfigs} from "../../../../../consts/logtypes";

const RadioGroup = Radio.Group;



class FilterBar extends Component {
  state = {
    logTypeDropdownVisible: false,
    sortedDropdownVisible: false,
    keywordTemp: ""
  };

  // 生成日志类型菜单项
  getLogTypeMenuItems = () => {
    const { filterConditions, logTypesInTask, type } = this.props;
    const LOGTYPES_CONFIG = type === "native" ? nativeLogTypeConfigs : webLogTypeConfigs;
    const checked = filterConditions.logTypes;
    const allChecked = checked.length === logTypesInTask.length;

    // “全选”项
    const items = [
      {
        key: "all",
        label: (
          <Checkbox
            checked={allChecked}
            onChange={() => {
              this.handleLogTypesChanged(
                allChecked ? [] : logTypesInTask
              );
            }}
          >
            全选
          </Checkbox>
        )
      },
      { type: "divider" }
    ];

    // 具体类型项
    logTypesInTask.forEach(logType => {
      const config = LOGTYPES_CONFIG.find(item => item.logType === logType);
      items.push({
        key: String(logType),
        label: (
          <Checkbox
            checked={checked.includes(logType)}
            onChange={() => {
              let newChecked;
              if (checked.includes(logType)) {
                newChecked = checked.filter(i => i !== logType);
              } else {
                newChecked = [...checked, logType];
              }
              this.handleLogTypesChanged(newChecked);
            }}
          >
            <span style={{ color: config ? config.displayColor : "#000" }}>
              {config ? config.logTypeName : "未知类型"}
            </span>
          </Checkbox>
        )
      });
    });

    return items;
  };

  // 生成排序菜单项
  getSortedMenuItems = () => {
    const { sorted } = this.props;
    return [
      {
        key: "asc",
        label: (
          <div
            className="reverse-type-item"
            style={{ color: sorted ? "#1677ff" : undefined }}
            onClick={() => this.handleSortedChange(true)}
          >
            升序 <ArrowUpOutlined className="reverse-arrow" />
          </div>
        )
      },
      {
        key: "desc",
        label: (
          <div
            className="reverse-type-item"
            style={{ color: !sorted ? "#1677ff" : undefined }}
            onClick={() => this.handleSortedChange(false)}
          >
            降序 <ArrowDownOutlined className="reverse-arrow" />
          </div>
        )
      }
    ];
  };

  render() {
    const { filterConditions } = this.props;

    return (
      <div className="filterbar-container">
        <Dropdown
          menu={{ items: this.getLogTypeMenuItems() }}
          trigger={["click"]}
          open={this.state.logTypeDropdownVisible}
          onOpenChange={flag => {
            this.setState({ logTypeDropdownVisible: flag });
          }}
        >
          <Button className="filter-log-type">
            <CheckSquareOutlined />
            日志类型
          </Button>
        </Dropdown>
        <Dropdown
          menu={{ items: this.getSortedMenuItems() }}
          trigger={["click"]}
          open={this.state.sortedDropdownVisible}
          onOpenChange={flag => {
            this.setState({ sortedDropdownVisible: flag });
          }}
        >
          <Button className="filter-log-type">
            <CheckCircleOutlined />
            {filterConditions.sorted === false ? "排序方式：降序" : "排序方式：升序"}
          </Button>
        </Dropdown>

        <div className="filter-keyword-search-wrapper">
          <Input
            style={{ flex: 1 }}
            className="filter-keyword-search"
            placeholder="查找日志关键字，回车提交"
            prefix={
              this.state.keywordTemp ? (
                <CloseCircleOutlined
                  style={{ color: "rgba(0,0,0,.25)", cursor: "pointer" }}
                  onClick={this.handleKeywordClear}
                />
              ) : (
                <span />
              )
            }
            suffix={
              this.state.keywordTemp ? (
                <SearchOutlined
                  style={{ color: "rgba(0,0,0,.45)", cursor: "pointer" }}
                  onClick={this.handleKeywordSearchConfirm}
                />
              ) : (
                <span />
              )
            }
            value={this.state.keywordTemp}
            onChange={this.handleKeywordTempChange}
            onPressEnter={this.handleKeywordSearchConfirm}
          />
        </div>
      </div>
    );
  }

  handleLogTypesChanged = checkedItems => {
    const { filterConditions, onFilterConditionChanged } = this.props;
    onFilterConditionChanged({
      ...filterConditions,
      logTypes: checkedItems
    });
  };

  handleSortedChange = value => {
    const { onSortedChanged, rollingListManually } = this.props;
    this.setState({ sortedDropdownVisible: false });
    onSortedChanged(value);
    rollingListManually(0);
  };

  handleKeywordClear = () => {
    const { filterConditions, onFilterConditionChanged } = this.props;
    onFilterConditionChanged({
      ...filterConditions,
      keyword: ""
    });
    this.setState({
      keywordTemp: "",
      searchCursor: null
    });
  };

  handleKeywordTempChange = e => {
    this.setState({
      keywordTemp: e.target.value
    });
  };

  handleKeywordSearchConfirm = () => {
    const { filterConditions, onFilterConditionChanged } = this.props;
    onFilterConditionChanged({
      ...filterConditions,
      keyword: this.state.keywordTemp
    });
  };
}

export default FilterBar;
