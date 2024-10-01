import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSocket } from '../../hooks/index.jsx';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';

const Rename = ({ handleClose, channelId }) => {
  const socketApi = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const channels = useSelector(channelsSelectors.selectAll);
  const channelNames = channels.map((el) => el.name);
  const channelName = useSelector((state) => channelsSelectors.selectById(state, channelId));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Минимум 3 буквы')
      .max(20, 'Максимум 20 букв')
      .required()
      .notOneOf(
        channelNames,
        'Уникальное Имя',
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: channelName?.name,
    },
    validationSchema,
    onSubmit: async ({ name }) => {
      const renamedChannel = { name: name.trim(), id: channelId };
      try {
        await socketApi.renameChannel(renamedChannel);
        toast.success('Канал переименнован', {
          position: 'top-right',
        });
        handleClose();
      } catch (error) {
        formik.setFieldError('name', error.message);
        toast.error('Ошибка', {
          position: 'top-right',
        });
        console.error(error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, [formik.touched.name]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="h4">
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Floating>
            <Form.Control
              className="mb-2"
              placeholder="Имя канала"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              name="name"
              id="name"
              autoFocus
              autoComplete="false"
              ref={inputRef}
              type="text"
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              Переименовать канал
            </Form.Label>
            <Form.Control.Feedback type="invalid" className="mb-2">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="secondary" className="me-2" onClick={handleClose}>
                Отменить
              </Button>
              <Button type="submit" variant="primary" disabled={!!formik.errors.name}>
                Отправить
              </Button>
            </div>
          </Form.Floating>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
