import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom';

import routes from '../routes.js';

import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import SingUpPage from './SingUpPage.jsx';
import ChatPage from './ChatPage.jsx';

const App = () => (
    <>
        <Router>
          <div className="d-flex flex-column vh-100">
            <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
              <Container>
                <Navbar.Brand as={Link} to={routes.chatPagePath()}>Hexlet Chat</Navbar.Brand>
              </Container>
            </Navbar>

            <Routes>
              <Route path={routes.loginPagePath()} element={<LoginPage />} />
              <Route path={routes.signUpPagePath()} element={<SingUpPage />} />
              <Route path={routes.chatPagePath()} element={<ChatPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
    </>
);

export default App;
