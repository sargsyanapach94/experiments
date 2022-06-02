import Konva from 'konva';

import drawText from '../utils/drawText';

const sceneFunc = (ctx, shape) => {
  const shapTextAttrs = shape.getAttrs();
  const textMetrics = drawText(ctx, shapTextAttrs);

  if (!textMetrics) return null;

  shape.setAttrs({
    // x: initialAttrs.x + (textMetrics.xDiff || 0),
    width: textMetrics.width,
    height: textMetrics.height,
  });
  // (!) Konva specific method, it is very important
  // ctx.fillStrokeShape(shape);
};

const hitFunc = (ctx, shape) => {
  ctx.beginPath();
  ctx.rect(0, 0, shape.width(), shape.height());
  ctx.closePath();
  // important Konva method that fill and stroke shape from its properties
  ctx.fillStrokeShape(shape);
};

const createShapeText = defaultAttrs => {
  const initialAttrs = {
    x: 100,
    y: 200,
    draggable: true,
    stroke: 'red',
    // shadowColor: 'blue',
    fontSize: 50,
    rotation: 0,
    opacity: 1,
    letterSpacing: 0,
    // scale: {x: 0.1,y:0.1},
  };

  const attrs = {
    ...defaultAttrs,
    ...initialAttrs,
  };

  return new Konva.Shape({
    ...attrs,
    sceneFunc, // all drawing functionalities are written here
    hitFunc,
  });
};

export default createShapeText;
