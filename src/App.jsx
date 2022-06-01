import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <h1>experiments</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/shapeText">Shape Text</Link>
        {' '}
        |
        <Link to="/canvaskitWasm">CanvasKit - Skia + WebAssembly</Link>
        {' '}
        |
      </nav>
    </div>
  );
}
