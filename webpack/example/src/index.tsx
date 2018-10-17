import React from 'react';
import { render } from 'react-dom';

import App from 'components/organisms/App';

const AppNode = document.getElementById('app');

render(
  <App />,
  AppNode,
);
