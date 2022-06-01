const { abs, PI } = Math;

export const degreesToRadians = degrees => degrees * (PI / 180);

export const drawRect = (ctx, bbox, color) => {
  ctx.save();
  ctx.strokeStyle = color || 'pink';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(bbox.x1, bbox.y1, bbox.x2 - bbox.x1, bbox.y2 - bbox.y1);
  ctx.stroke();
  ctx.restore();
};

export const drawArc = (ctx, attrs) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(attrs.x, attrs.y, abs(attrs.radius), degreesToRadians(attrs.startAngle), degreesToRadians(attrs.endAngle));
  ctx.stroke();
  ctx.restore();
};

export const drawBBox = (ctx, attrs, measure) => {
  drawRect(ctx, {
    x1: attrs.position.x + measure.actualBoundingBoxLeft,
    y1: attrs.position.y - measure.actualBoundingBoxAscent,
    x2: attrs.position.x + measure.actualBoundingBoxRight,
    y2: attrs.position.y + measure.actualBoundingBoxDescent,
  }, attrs.color || 'blue');
};

export const drawBaseLine = (ctx, attrs, measure) => {
  drawRect(ctx, {
    x1: measure.actualBoundingBoxLeft,
    y1: measure.fontBoundingBoxAscent,
    x2: measure.actualBoundingBoxRight,
    y2: measure.fontBoundingBoxAscent,
  }, attrs.color || 'green');
};

export const drawAscAndDesc = (ctx, attrs, measure) => {
  drawRect(ctx, {
    x1: attrs.position.x + measure.actualBoundingBoxLeft,
    y1: attrs.position.y - measure.fontBoundingBoxAscent,
    x2: attrs.position.x + measure.actualBoundingBoxRight,
    y2: attrs.position.y + measure.fontBoundingBoxDescent,
  }, attrs.color || 'red');
};

export const drawText = (ctx, attrs, options) => {
  ctx.font = `${attrs.fontSize}px ${attrs.font || 'Archivo Black'}`;
  // ctx.textBaseline = 'middle'
  ctx.fillText(attrs.text, attrs.position.x, attrs.position.y);
  // const measure = ctx.measureText(text);
  const measure = ctx.measureText(attrs.text);
  // console.log(measure);

  options?.bbox && drawBBox(ctx, attrs, measure);
  options?.baseLine && drawBaseLine(ctx, attrs, measure);
  options?.ascAndDesc && drawAscAndDesc(ctx, attrs, measure);

  return measure;
};

export const loadFont = async (fontName, path) => {
  const junctionFont = await new FontFace(fontName, `url(${path})`);
  if (!junctionFont.family) return;
  try {
    const loadedFace = await junctionFont.load();
    document.fonts.add(loadedFace);
    return loadedFace;
  } catch (error) {
    console.error(error, 'error');
    throw error;
  }
};
