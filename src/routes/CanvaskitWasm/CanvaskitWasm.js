import { useEffect } from 'react';

import drawText from './utils/drawText';

const ckLoaded = CanvasKitInit({
  locateFile: file => `https://unpkg.com/canvaskit-wasm@0.19.0/bin/${file}`,
});

const canvasSize = {
  w: 900,
  h: 700,
};

const loadFont = fetch('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')
  .then(response => response.arrayBuffer());

function CanvaskitWasm() {
  useEffect(() => {
    Promise.all([ckLoaded, loadFont]).then(([CanvasKit, robotoData]) => {
      const surface = CanvasKit.MakeCanvasSurface('foo');

      const paint = new CanvasKit.Paint();
      paint.setColor(CanvasKit.Color4f(0.9, 0, 0, 1.0));
      paint.setStyle(CanvasKit.PaintStyle.Stroke);
      paint.setAntiAlias(true);

      // const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(10, 60, 210, 260), 25, 15);
      const w = 100; // size of rect
      const h = 60;
      let x = 10; // initial position of top left corner.
      let y = 60;
      let dirX = 5; // box is always moving at a constant speed in one of the four diagonal directions
      let dirY = 5;

      function drawFrame(canvas) {
        canvas.clear(CanvasKit.WHITE);
        drawText(CanvasKit, surface, robotoData);

        // boundary check
        if (x < 0 || x + w > canvasSize.w) {
          dirX *= -1; // reverse x direction when hitting side walls
        }
        if (y < 0 || y + h > canvasSize.h) {
          dirY *= -1; // reverse y direction when hitting top and bottom walls
        }
        // move
        x += dirX;
        y += dirY;

        const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(x, y, x + w, y + h), 25, 15);
        canvas.drawRRect(rr, paint);
        surface.requestAnimationFrame(drawFrame);
      }
      surface.requestAnimationFrame(drawFrame);
    });
  }, []);

  return (
    <main>
      <h3>CanvasKit - Skia + WebAssembly</h3>

      <div id="container">
        <canvas id="foo" width={canvasSize.w} height={canvasSize.h} style={{ border: '1px solid red' }} />
      </div>
    </main>
  );
}

export default CanvaskitWasm;
