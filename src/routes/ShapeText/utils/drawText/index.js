import drawBendText from './drawBendText';
import drawSimpleText from './drawSimpleText';

const drawText = (ctx, attrs) => {
  if (!attrs.text) return null;

  const textAttrs = {
    ...attrs,
    bold: attrs.bold ? 'bold' : '',
    italic: attrs.italic ? 'italic' : '',
    lineSpacing: attrs.lineSpacing || 0,
  };

  // ctx.textBaseline = 'middle';

  if (attrs.bend) {
    return drawBendText(ctx, textAttrs);
  }

  return drawSimpleText(ctx, textAttrs);
};

export default drawText;
