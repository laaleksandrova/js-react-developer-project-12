import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    deleteChannel: (state, { payload: { id } }) => {
      channelsAdapter.removeOne(state, id);
      if ( id === state.currentChannelId) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.defaultChannelId = action.payload.currentChannelId;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
