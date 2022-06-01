import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import ShapeText from './routes/ShapeText';
import 'react-input-range/lib/css/index.css';
import CanvaskitWasm from './routes/CanvaskitWasm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="shapeText" element={<ShapeText />} />
        <Route path="canvaskitWasm" element={<CanvaskitWasm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
