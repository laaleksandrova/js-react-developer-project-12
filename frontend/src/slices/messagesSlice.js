import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';
import fetchData from './fetchData.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(channelsActions.deleteChannel, (state, { payload: { id } }) => {
        const messagesByChannelId = Object.values(state.entities)
          .filter(({ channelId }) => channelId === id)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messagesByChannelId);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
