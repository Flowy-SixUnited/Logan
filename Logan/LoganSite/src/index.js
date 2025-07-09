import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from "./app";
import { Provider } from 'react-redux';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);