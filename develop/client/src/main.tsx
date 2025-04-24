import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Adjust if you don't have an index.css file

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);