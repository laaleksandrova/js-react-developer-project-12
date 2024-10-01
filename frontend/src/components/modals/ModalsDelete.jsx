import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSocket } from '../../hooks/index.jsx';

const Delete = ({ handleClose, channelId }) => {
  const socketApi = useSocket();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleRemove = async () => {
    try {
      setButtonDisabled(true);
      await socketApi.deleteChannel({ id: channelId });
      toast.success('Канал удален', {
        position: 'top-right',
      });
      handleClose();
    } catch (error) {
      setButtonDisabled(false);
      toast.error('Ошибка', {
        position: 'top-right',
      });
      console.error(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="mt-3 d-flex justify-content-end">
          <Button disabled={buttonDisabled} className="me-2" variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button disabled={buttonDisabled} variant="danger" type="button" onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Delete;
