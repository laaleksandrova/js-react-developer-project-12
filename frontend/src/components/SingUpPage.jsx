/* eslint-disable functional/no-expression-statements */
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.jsx';

const signUpSchema = Yup.object().shape({
  username: Yup.string().trim()
    .min(3, 'Минимум 3 буквы')
    .max(25, 'Максимум 25 букв')
    .required('Обязательное поле'),
  password: Yup.string().trim()
    .min(6, 'Минимум 6 знаков')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const SingUpPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signUpFailed, setSignUpFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async ({ username, password, confirmPassword }) => {
      setSignUpFailed(false);
      try {
        const res = await axios.post(
          routes.signUpApiPath(),
          { username, password, confirmPassword },
        );
        auth.logIn(res.data);
        navigate(routes.chatPagePath());
      } catch (error) {
        formik.setSubmitting(false);
        if (!error.isAxiosError) {
          throw error;
        }
        if (error.response.status === 409) {
          setSignUpFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card>
            <Card.Body className="row p-5">
              <Row>
                <Col className="d-flex align-items-center justify-content-center">
                  <Image src="avatar_1.jpg" alt="Регистрация" roundedCircle />
                </Col>
                <Col className="mt-3 mt-mb-0">
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <fieldset disabled={formik.isSubmitting}>
                      <Form.Group controlId="username" className="form-floating mb-3">
                        <FloatingLabel controlId="username" label="Имя пользователя" className="">
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="Имя пользователя"
                            autoComplete="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            ref={inputRef}
                            required
                            isInvalid={signUpFailed || (formik.touched.username
                              && formik.errors.username)}
                          />
                          {signUpFailed && (
                            <Form.Control.Feedback type="invalid" tooltip>
                              Этот пользователь уже существует
                            </Form.Control.Feedback>
                          )}
                          {formik.errors.username && (
                            <Form.Control.Feedback type="invalid" tooltip>
                              Обязательное поле
                            </Form.Control.Feedback>
                          )}
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group controlId="password" className="form-floating mb-4">
                        <FloatingLabel controlId="password" label="Пароль">
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            autoComplete="new-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            required
                            isInvalid={formik.touched.password && formik.errors.password}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            Обязательное поле
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group controlId="password" className="form-floating mb-4">
                        <FloatingLabel controlId="confirmPassword" label="Подтвердите пароль">
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Подтвердите пароль"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            required
                            isInvalid={formik.touched.passwordConfirmation
                              && formik.errors.passwordConfirmation}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            Пароли должны совпадать
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3" variant="outline-primary">Зарегистрироваться</Button>
                    </fieldset>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingUpPage;
