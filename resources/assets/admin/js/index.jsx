import React from 'react';
import {createRoot} from 'react-dom/client';
import Admin from "./components/Admin";
// import 'bootstrap';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<Admin />);
}

