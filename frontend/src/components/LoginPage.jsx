/* eslint-disable functional/no-expression-statements */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import routes from '../routes.js';
import { useAuth } from '../hooks/index.jsx';

const signupSchema = Yup.object().shape({
  username: Yup.string().trim()
    .min(3, 'Минимум 3 буквы')
    .max(25, 'Максимум 25 букв')
    .required('Обязательное поле'),
  password: Yup.string().trim()
    .min(6, 'Минимум 6 знаков')
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginApiPath(), { username, password });
        auth.logIn(res.data);
        navigate(routes.chatPagePath());
      } catch (error) {
        formik.setSubmitting(false);
        if (!error.isAxiosError) {
          throw error;
        }
        if (error.response?.status === 401) {
          setAuthFailed(true);
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
                  <Image src="login-image.jpg" alt="Войти" roundedCircle />
                </Col>
                <Col className="mt-3 mt-mb-0">
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <fieldset disabled={formik.isSubmitting}>
                      <Form.Group controlId="username" className="form-floating mb-3">
                        <FloatingLabel controlId="username" label="Ваш ник" className="">
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="Ваш ник"
                            autoComplete="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            isInvalid={authFailed}
                            ref={inputRef}
                            required
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group controlId="password" className="form-floating mb-4">
                        <FloatingLabel controlId="password" label="Пароль">
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            isInvalid={authFailed}
                            required
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            Неверный логин и пароль
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3" variant="outline-primary">Войти</Button>
                    </fieldset>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to={routes.signUpPagePath()}>Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
