import { createRoot } from 'react-dom/client';
import React from 'react';
import App from "./app";

const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello React 19!</h1>); 
// root.render(<App />);