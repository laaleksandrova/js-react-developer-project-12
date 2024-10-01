import React from 'react';
import store from './slices/index.js';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { SocketContext } from './context/index.jsx';

import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

import App from './components/App';

const socketTimeoutMs = 5000;

const init = () => {
  const socket = io();

  socket
  .on("connect", () => {
    console.log(socket.connected); // true
  })
  .on("disconnect", () => {
    console.log(socket.connected); // false
  })
  .on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  })
  .on('deleteChannel', (payload) => {
    store.dispatch(channelsActions.deleteChannel(payload));
  })
  .on('renameChannel', (payload) => {
    const { id, name } = payload;
    store.dispatch(channelsActions.updateChannel({ id, name }));
  })
  .on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });


  const getSocketEmitPromise = (...args) => new Promise((resolve, reject) => {
    socket.timeout(socketTimeoutMs).emit(...args, (err, response) => {
      if (err) {
        reject(err)
      };
      resolve(response);
    });
  });

  const socketApi = {
    newMessage: (...args) => getSocketEmitPromise('newMessage', ...args),
    newChannel: (...args) => getSocketEmitPromise('newChannel', ...args),
    deleteChannel: (...args) => getSocketEmitPromise('deleteChannel', ...args),
    renameChannel: (...args) => getSocketEmitPromise('renameChannel', ...args),
  };

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socketApi}>
        <App />
      </SocketContext.Provider>
    </Provider>
  );
};

export default init;
