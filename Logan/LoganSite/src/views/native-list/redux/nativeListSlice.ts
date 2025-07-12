import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { fetchNativeTaskApi, fetchNativeListInitData } from '../../../common/api';

export interface NativeListFilterConditions {
  deviceId: string;
  platform: number;
  beginTime: number;
  endTime: number;
}

export interface NativeListState {
  filterConditions: NativeListFilterConditions;
  tasks: any[];
  loading: boolean;
}

const initialState: NativeListState = {
  filterConditions: {
    deviceId: '',
    platform: 0,
    beginTime: moment().startOf('day').subtract(7, 'days').valueOf(),
    endTime: moment().startOf('day').valueOf(),
  },
  tasks: [],
  loading: false,
};

export const fetchInitData = createAsyncThunk('nativeList/fetchInitData', async () => {
  const response = await fetchNativeListInitData();
  return response.data; // 只返回data
});

export const fetchTasks = createAsyncThunk(
  'nativeList/fetchTasks',
  async (params: { deviceId: string; platform: number; beginTime: number; endTime: number }) => {
    const response = await fetchNativeTaskApi(
      params.deviceId,
      params.platform,
      params.beginTime,
      params.endTime
    );
    return response.data; // 只返回data
  }
);

const nativeListSlice = createSlice({
  name: 'nativeList',
  initialState,
  reducers: {
    updateFilterConditions(state, action: PayloadAction<NativeListFilterConditions>) {
      state.filterConditions = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchInitData.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchInitData.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, state => {
        state.loading = false;
      });
  },
});

export const { updateFilterConditions } = nativeListSlice.actions;
export default nativeListSlice.reducer; 