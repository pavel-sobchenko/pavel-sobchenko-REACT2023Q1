import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import Router from './Router';

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  return ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={path}>
      <Router />
    </StaticRouter>
  );
};
