import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import CanvaskitWasm from './routes/CanvaskitWasm';
import ShapeText from './routes/ShapeText';

function AllTheProviders({ children }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="shapeText" element={<ShapeText />} />
          <Route path="canvaskitWasm" element={<CanvaskitWasm />} />
          {children}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
