import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import Add from './ModalsAdd.jsx';
import Rename from './ModalsRename.jsx';
import Delete from './ModalsDelete.jsx';

const modalComponents = {
  adding: Add,
  renaming: Rename,
  deleting: Delete,
};

const Modals = () => {
  const dispatch = useDispatch();
  const { isOpen, type, channelId } = useSelector((state) => state.modals);
  const ModalComponent = modalComponents[type];
  const handleClose = () => dispatch(modalsActions.closeModal());

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
    >
      {isOpen && (
        <ModalComponent
          channelId={channelId}
          handleClose={handleClose}
        />
      )}
    </Modal>
  );
};

export default Modals;
