/* eslint functional/no-return-void: "error" */
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes.js';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import * as Yup from 'yup';

const SignupSchema =  Yup.object().shape({
  username: Yup.string().trim()
    .min(4, 'Минимум 4 буквы')
    .max(25, 'Максимум 25 букв')
    .required('Обязательное поле'),
    password: Yup.string().trim().required('Обязательное поле'),
});

const LoginPage  = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400)},
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
                      <fieldset>
                        <Form.Group controlId="username" className="form-floating mb-3">
                          <FloatingLabel controlId="username" label="Ваш ник" className="">
                            <Form.Control
                              name="username"
                              placeholder="Ваш ник"
                              autoComplete="username"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.username}
                              isInvalid={formik.touched.username && formik.errors.username}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {formik.errors.username}
                            </Form.Control.Feedback>
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
                              isInvalid={formik.touched.password && formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {formik.errors.password}
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