import React, { Component } from "react";
import { connect } from "react-redux";
import { parse } from "qs";
import { useNavigate, useLocation } from "react-router-dom";

import {
  fetchPageInitData,
  fetchTaskDetail,
  updateFilterConditions,
  updateFocusLogId,
  updateHighLightIndex,
  updateSorted,
  initState
} from "./redux/action";

import LogDetailPage from "../components/log-detail-page/index";
import { message } from "antd";

export function mapStateToProps(state) {
  return {
    ...state.webLogDetail,
    webListFilterConditions: state.webList.filterConditions
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageInitData: (taskId, focusLogId) => dispatch(fetchPageInitData(taskId, focusLogId)),
    updateFocusLogId: topLogId => dispatch(updateFocusLogId(topLogId)),
    updateFilterConditions: filterConditions => dispatch(updateFilterConditions(filterConditions)),
    updateHighLightIndex: (start, end) => dispatch(updateHighLightIndex(start, end)),
    fetchTaskDetail: (detailIds, direction) => dispatch(fetchTaskDetail(detailIds, direction)),
    updateSorted: (sorted) => dispatch(updateSorted(sorted)),
    initState: () => dispatch(initState())
  };
}

export class WebLogDetail extends Component {
  componentDidCatch(error, errorInfo) {
    message.error("页面异常！");
    if (this.props.navigate) {
      this.props.navigate("/");
    }
  }

  componentDidMount() {
    const { initState } = this.props;
    initState();

    let params = {};
    if (this.props.location) {
      params = parse(this.props.location.search, { ignoreQueryPrefix: true });
    }
    const { tasks, focusLogId } = params;
    this.props.fetchPageInitData(tasks, focusLogId);
  }

  render() {
    return (
      <LogDetailPage
        data-test="WebLogDetailPage"
        {...this.props}
        type="web"
      />
    );
  }
}

const ConnectedWebLogDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(WebLogDetail);

// 关键：用 hooks 包裹，传递 navigate/location
export default function WebLogDetailWrapper(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ConnectedWebLogDetail {...props} navigate={navigate} location={location} />
  );
}