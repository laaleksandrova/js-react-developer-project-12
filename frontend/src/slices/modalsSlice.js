import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
  isOpen: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.channelId ?? null;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelId = null;
      state.isOpen = false;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
