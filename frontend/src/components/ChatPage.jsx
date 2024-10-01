import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Spinner ,
} from 'react-bootstrap';
import fetchData from '../slices/fetchData.js';
import { useAuth } from '../hooks/index.jsx';

import Modals from './modals/Modals.jsx';
import ChatPageChannels from './ChatPageChannels.jsx';
import ChatPageChat from './ChatPageChat.jsx';

const ChatPage = () => {
  const auth = useAuth();
  const token = auth.getToken();
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    const requestData = async () => {
      try {
        await dispatch(fetchData(token));
      } catch (error) {
        /* eslint-disable-next-line */
        if (error.message === 'Request failed with status code 500' || error.message === 'Request failed with status code 401') {
          auth.logOut();
        }
      }
    };

    requestData();
    setLoaded(true);
  }, [isLoaded, dispatch, auth]);


  return isLoaded ? (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Modals />
      <Row className="h-100 bg-white flex-md-row">
        <ChatPageChannels className="h-100 my-4 overflow-hidden rounded shadow" />
        <ChatPageChat className="h-100 bg-white flex-md-row" />
      </Row>
    </Container>
  ) : (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">loading...</span>
      </Spinner>
    </div>
  );
};

export default ChatPage;
