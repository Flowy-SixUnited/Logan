import { configureStore } from '@reduxjs/toolkit';
import nativeListReducer from '../views/native-list/redux/nativeListSlice';
// 兼容老reducer，后续逐步迁移
import nativeLogDetailReducer from '../views/native-log-detail/redux/reducer';
import webListReducer from '../views/web-list/redux/reducer';
import webLogDetailReducer from '../views/web-detail/redux/reducer';

const store = configureStore({
  reducer: {
    nativeList: nativeListReducer,
    nativeLogDetail: nativeLogDetailReducer,
    webList: webListReducer,
    webLogDetail: webLogDetailReducer,
  },
  // 可根据需要添加middleware、devTools等配置
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 