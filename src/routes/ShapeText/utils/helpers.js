const { abs, PI, sign, cos } = Math;

export const degreesToRadians = degrees => degrees * (PI / 180);

export const drawRect = (ctx, bbox, color) => {
  ctx.save();
  ctx.strokeStyle = color || 'pink';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(0, bbox.y1, bbox.x2 - bbox.x1, bbox.y2 - bbox.y1);
  ctx.stroke();
  ctx.restore();
};

export const drawArc = (ctx, position, segmentAngle, arcLength, radius) => {
  const direction = sign(segmentAngle);
  const absSegmentAngle = abs(segmentAngle);
  const startAngle = direction > 0 ? (180 - absSegmentAngle) / 2 : 180 + (180 - absSegmentAngle) / 2;
  const endAngle = startAngle + absSegmentAngle;
  const arcAttrs = {
    x: position.x + arcLength / 2,
    y: position.y - direction * (radius + cos(degreesToRadians(absSegmentAngle / 2)) * radius) / 2,
    radius,
    startAngle,
    endAngle,
    segmentAngle,
  };

  ctx.save();
  ctx.beginPath();
  ctx.arc(arcAttrs.x, arcAttrs.y, abs(arcAttrs.radius), degreesToRadians(arcAttrs.startAngle), degreesToRadians(arcAttrs.endAngle));
  ctx.stroke();
  ctx.restore();

  return arcAttrs;
};

export const drawBBox = (ctx, attrs, measure) => {
  drawRect(ctx, {
    x1: measure.actualBoundingBoxLeft,
    y1: 0,
    x2: measure.actualBoundingBoxRight,
    y2: measure.fontBoundingBoxAscent + measure.actualBoundingBoxDescent,
  }, attrs.color || 'blue');
};

export const drawBaseLine = (ctx, attrs, measure) => {
  drawRect(ctx, {
    x1: measure.actualBoundingBoxLeft,
    y1: attrs.y,
    x2: measure.actualBoundingBoxRight,
    y2: attrs.y,
  }, attrs.color || 'green');
};

export const drawAscAndDesc = (ctx, attrs, measure) => {
  drawRect(ctx, {
    x1: measure.actualBoundingBoxLeft,
    y1: 0,
    x2: measure.actualBoundingBoxRight,
    y2: measure.fontBoundingBoxAscent + measure.actualBoundingBoxDescent,
  }, attrs.color || 'red');
};

export const drawText = (ctx, attrs, options) => {
  ctx.font = `${attrs.fontSize}px ${attrs.font || 'Archivo Black'}`;
  // ctx.textBaseline = 'middle'
  ctx.fillText(attrs.text, attrs.position.x, attrs.position.y);
  const measure = ctx.measureText(attrs.text);

  if (options?.bbox) drawBBox(ctx, attrs, measure);
  if (options?.baseLine) drawBaseLine(ctx, attrs, measure);
  if (options?.ascAndDesc) drawAscAndDesc(ctx, attrs, measure);

  return measure;
};

export const loadFont = async (fontName, path) => {
  const junctionFont = new FontFace(fontName, `url(${path})`);
  if (!junctionFont.family) return;
  try {
    const loadedFace = await junctionFont.load();
    document.fonts.add(loadedFace);
    return loadedFace;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
