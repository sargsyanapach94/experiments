import applayStroke from './applyStroke';
import applayShadow from './applayShadow';
import bendText from './bendText';
import { drawBaseLine } from './helpers';

const { abs } = Math;
/* TODO: Text features
  * Decoration
  * Alignment
  * Caps
  * line height
  * blend mode
*/

const drawSimpleText = (ctx, attrs, measure) => {
  let lastXPos = 0;
  const yPosition = measure.fontBoundingBoxAscent;
  for (let i = 0; i < attrs.text.length; ++i) {
    const letter = attrs.text[i];
    const measure = ctx.measureText(letter);

    if (attrs.strokeWidth) {
      applayStroke(ctx, letter, lastXPos, yPosition, attrs);
    }

    if (attrs.shadowColor) {
      applayShadow(ctx, letter, lastXPos, yPosition, attrs);
    }
    ctx.fillStyle = attrs.fill || 'black';
    ctx.fillText(letter, lastXPos, yPosition);
    lastXPos += measure.width + attrs.letterSpacing;
  }

  return {
    // width: measure.width + attrs.text.length * attrs.letterSpacing,
    width: abs(measure.actualBoundingBoxLeft) + measure.actualBoundingBoxRight + attrs.text.length * attrs.letterSpacing,
    height: measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent,
  };
};

const drawText = (ctx, attrs) => {
  if (!attrs.text) return null;
  const bold = attrs.bold ? 'bold' : '';
  const italic = attrs.italic ? 'italic' : '';

  ctx.textBaseline = 'middle';
  // ctx.font = `${attrs.fontSize}px ${attrs.font || 'Archivo Black'}`;
  ctx.font = ` ${bold} ${italic} ${attrs.fontSize}px ${attrs.font || 'Archivo Black'}`;

  const measure = ctx.measureText(attrs.text);
  drawBaseLine(ctx, attrs, measure);

  if (attrs.bend) {
    return bendText(ctx, attrs, measure);
  }

  return drawSimpleText(ctx, attrs, measure);
};

export default drawText;
