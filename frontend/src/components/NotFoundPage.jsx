/* eslint functional/no-return-void: "error" */
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes.js';
import Image from 'react-bootstrap/Image';


const NotFoundPage = () => {
  return (
    <div className="text-center">
      <Image
        src="404.svg"
        alt="Страница не найдена"
        fluid
        className="h-25"
      />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        <span>Но вы можете перейти </span>
        <Link to={routes.chatPagePath()}>на главную страницу</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;