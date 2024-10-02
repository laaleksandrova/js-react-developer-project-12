/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Dropdown,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';

const ChatPageChannels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);

  const handleCurrentChannel = (id) => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  const handleDeleteChannel = (channelId) => {
    dispatch(modalsActions.openModal({ type: 'deleting', channelId }));
  };

  const handleRenameChannel = (channelId) => {
    dispatch(modalsActions.openModal({ type: 'renaming', channelId }));
  };

  const handleAddChannel = () => {
    dispatch(modalsActions.openModal({ type: 'adding' }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <p>Каналы</p>
        <Button type="button" className="p-0 text-primary" variant="group-vertical" onClick={() => handleAddChannel()}>
          <PlusSquare size={20} className="bi-plus-square" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ name, id, removable }) => (
          <li key={id} className=" nav-item w-100">
            { removable ? (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  type="button"
                  key={id}
                  className="w-100 rounded-0 border-0 text-start text-truncate"
                  onClick={handleCurrentChannel(id)}
                  variant={id === currentChannelId ? 'secondary' : null}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle split className="flex-grow-0 border-0" variant="secondary">
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDeleteChannel(id)}>Удалить</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRenameChannel(id)}>
                    Переименовать
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                type="button"
                className="w-100 rounded-0 text-start"
                id={id}
                name={name}
                onClick={handleCurrentChannel(id)}
                variant={id === currentChannelId ? 'secondary' : null}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default ChatPageChannels;
