import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import modalsReduser from './modalsSlice.js';
import messagesReduser from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    modals: modalsReduser,
    messages: messagesReduser,
  },
});
