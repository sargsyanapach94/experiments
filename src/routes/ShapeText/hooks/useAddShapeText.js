import Konva from 'konva';
import { useCallback } from 'react';

import drawText from '../utils/drawText';

// const font = 'Gravura Com';
const font = 'Archivo Black';
// const font = 'Monoton';

const useAddShapeText = defaultAttrs => {
  const addShapeText = useCallback(() => {
    if (defaultAttrs) return null;

    const initialAttrs = {
      text: 'The quick brown T',
      // text: 'The quick brown fox jumps over the lazy dog',
      x: 100,
      y: 200,
      draggable: true,
      stroke: 'red',
      // shadowColor: 'blue',
      fontSize: 50,
      font,
      rotation: 0,
      opacity: 1,
      letterSpacing: 0,
      // scale: {x: 0.1,y:0.1},
    };

    return new Konva.Shape({
      ...initialAttrs,
      sceneFunc(ctx, shape) {
        console.log('sceneFunc');
        const textShapeAttrs = shape.getAttrs();
        const textMetrics = drawText(ctx, textShapeAttrs);

        if (!textMetrics) return null;

        shape.setAttrs({
          // x: initialAttrs.x + (textMetrics.xDiff || 0),
          width: textMetrics.width,
          height: textMetrics.height,
        });
        // (!) Konva specific method, it is very important
        // ctx.fillStrokeShape(shape);
      },
      hitFunc(ctx, shape) {
        ctx.beginPath();
        ctx.rect(0, 0, shape.width(), shape.height());
        ctx.closePath();
        // important Konva method that fill and stroke shape from its properties
        ctx.fillStrokeShape(shape);
      },
    });
  }, [defaultAttrs]);

  return {
    addShapeText,
  };
};

export default useAddShapeText;
