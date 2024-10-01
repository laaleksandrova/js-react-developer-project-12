import { Col, Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSocket } from '../hooks/index.jsx';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

const ChatPageChat = () => {
  const socketApi = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  });

  const { username } = JSON.parse(localStorage.getItem('userId'));

  const channels = useSelector(channelsSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : 'general';

  const messages = useSelector(messagesSelectors.selectAll);
  const messagesOfCurrentChannel = messages
    .filter((message) => message.channelId === currentChannelId);

  const messageBox = useRef(null);
  useEffect(() => {
    messageBox.current.scrollTo(0, messageBox.current.scrollHeight);
  }, [messagesOfCurrentChannel]);

  const validationSchema = yup.object().shape({
    messageText: yup
      .string()
      .trim()
      .min(1)
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      messageText: '',
    },
    validationSchema,
    onSubmit: async ({ messageText }) => {
      try {
        await socketApi.newMessage({
          message: messageText,
          channelId: currentChannelId,
          user: username,
        });
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`# ${currentChannelName}`}
            </b>
          </p>
          <span className="text-muted">
            {`${messagesOfCurrentChannel.length} сообщений`}
          </span>
        </div>
        <div id="messages-box" ref={messageBox} className="chat-messages overflow-auto px-5">
          {messagesOfCurrentChannel.map(({ id, user, message }) => (
            <div key={id} className={username === user ? 'user-message text-break mb-2' : 'message text-break mb-2'}>
              <b>{user}</b>
              {': '}
              {message}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <Form.Group className="input-group has-validation">
              <Form.Control
                placeholder="Введите сообщение..."
                aria-label="Новое сообщение"
                className="border-0 p-0 ps-2"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.messageText}
                name="messageText"
                id="messageText"
                autoFocus
                ref={inputRef}
              />
              <Button className="btn-light btn-group-vertical" type="submit">
                <ArrowRightSquare className="bi-plus-square" size={20} />
                <span className="visually-hidden">Отправить</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default ChatPageChat;
