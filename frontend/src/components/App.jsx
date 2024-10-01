import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ToastContainer } from 'react-toastify';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';

import routes from '../routes.js';
import { useAuth } from '../hooks/index.jsx';
import AuthProvider from '../context/AuthProvider.jsx';

import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import SingUpPage from './SingUpPage.jsx';
import ChatPage from './ChatPage.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} />;
};

const LogOutButton = () => {
  const auth = useAuth();
  const location = useLocation();
  return auth.loggedIn && <Button onClick={auth.logOut} state={{ from: location }}>Выйти</Button>;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column vh-100">
        <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand as={Link} to={routes.chatPagePath()}>Hexlet Chat</Navbar.Brand>
            <LogOutButton />
          </Container>
        </Navbar>

        <Routes>
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signUpPagePath()} element={<SingUpPage />} />
          <Route
            path={routes.chatPagePath()}
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  </AuthProvider>
);

export default App;
