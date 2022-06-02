import applayStroke from '../applyStroke';
import applayShadow from '../applayShadow';
import { drawBaseLine } from '../helpers';

const { max } = Math;

const drawLine = (ctx, attrs) => {
  let lineWidth = 0;
  let lastXPos = 0;

  for (let i = 0; i < attrs.text.length; ++i) {
    const character = attrs.text[i];
    const measure = ctx.measureText(character);

    if (attrs.strokeWidth) applayStroke(ctx, character, lastXPos, attrs.y, attrs);
    if (attrs.shadowColor) applayShadow(ctx, character, lastXPos, attrs.y, attrs);

    ctx.fillStyle = attrs.fill || 'black';
    ctx.fillText(character, lastXPos, attrs.y);

    lastXPos += measure.width + attrs.letterSpacing;
    lineWidth += measure.width;
    if (i !== attrs.text.length - 1) { // dont need to add letterSpacing for last character
      lineWidth += attrs.letterSpacing;
    }
  }
  
  return {
    width: lineWidth,
  };
};

const drawSimpleText = (ctx, attrs) => {
  ctx.font = ` ${attrs.bold} ${attrs.italic} ${attrs.fontSize}px ${attrs.font}`;

  const lines = attrs.text.split('\n');
  const textBBox = { width: 0, height: 0 };
  let y = 0;

  lines.forEach((line, index) => {
    const measure = ctx.measureText(line);
    const lineHeight = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;

    if (index === 0) y = measure.fontBoundingBoxAscent;

    const lineAttrs = { ...attrs, text: line, y };
    drawBaseLine(ctx, lineAttrs, measure);

    const { width: lineWidth } = drawLine(ctx, lineAttrs);

    y += lineHeight + attrs.lineSpacing;
    textBBox.width = max(lineWidth, textBBox.width);
    textBBox.height += lineHeight;
    if (index !== lines.length - 1) { // don't need to add lineSpacing for last line
      textBBox.height += attrs.lineSpacing;
    }
  });

  return textBBox;
};

export default drawSimpleText;
