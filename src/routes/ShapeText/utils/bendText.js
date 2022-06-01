import applayStroke from './applyStroke';
import { degreesToRadians, drawArc } from './helpers';

const { abs, PI, sin, cos, sign, max } = Math;
const SlyderMaxValue = 50;

const getTextWidth = (measure, attrs) => measure.width + attrs.text.length * attrs.letterSpacing;

const getCircleRadius = (segmentAngle, arcLength) => abs((arcLength * 360) / (2 * PI * segmentAngle));

const bendText = (ctx, attrs, measure) => {
  const segmentAngle = (360 / SlyderMaxValue) * attrs.bend;
  const absSegmentAngle = abs(segmentAngle);
  const arcLength = getTextWidth(measure, attrs);
  const radius = getCircleRadius(segmentAngle, arcLength);

  const simpleHeight = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
  const chordLength = sin(degreesToRadians(absSegmentAngle / 2)) * radius * 2;
  const bbox = {
    width: absSegmentAngle < 180 ? chordLength + simpleHeight / 2 : radius * 2 + simpleHeight / 2,
    height: max(abs(radius - cos(degreesToRadians(absSegmentAngle / 2)) * radius), simpleHeight),
  };
  const xDiff = bbox.width - measure.width + attrs.text.length * attrs.letterSpacing;
  // const yDiff = bbox.height -
  // let lastXPos = xDiff / 2;
  const lastXPos = 0;
  const yPosition = measure.fontBoundingBoxAscent;

  const direction = sign(segmentAngle);
  const startAngle = direction > 0 ? (180 - absSegmentAngle) / 2 : 180 + (180 - absSegmentAngle) / 2;
  const endAngle = startAngle + absSegmentAngle;
  const circuleAttrs = {
    x: lastXPos + arcLength / 2,
    y: yPosition - direction * (radius + cos(degreesToRadians(absSegmentAngle / 2)) * radius) / 2,
    radius,
    startAngle,
    endAngle,
    segmentAngle,
  };
  drawArc(ctx, circuleAttrs);

  let letterAngle = startAngle;

  for (let i = 0; i < attrs.text.length; ++i) {
    const letter = attrs.text[i];
    const measure = ctx.measureText(attrs.text[i]);
    const radianAngle = degreesToRadians(90 - direction * letterAngle);
    const letterX = circuleAttrs.x - direction * radius * cos(degreesToRadians(letterAngle));
    const letterY = circuleAttrs.y + radius * sin(degreesToRadians(letterAngle));

    ctx.fillStyle = attrs.fill || 'black';
    const letterSpace = measure.width + attrs.letterSpacing;

    // ctx.rotate(radianAngle);
    // ctx.fillText(letter, letterX, letterY)

    ctx.save();
    // translate to the centerpoint you desire to rotate around
    ctx.translate(letterX, letterY);
    // rotate by the desired angle
    ctx.rotate(radianAngle);

    if (attrs.strokeWidth) {
      applayStroke(ctx, letter, 0, 0, attrs);
    }
    // draw the text on the canvas
    ctx.fillText(letter, 0, 0);

    // always clean up -- reset transformations to default
    ctx.restore();

    const diffAngle = (letterSpace * 360) / (2 * PI * radius);
    letterAngle += diffAngle;
  }

  return {
    xDiff,
    yDiff: 0,
    ...bbox,
  };
};

export default bendText;
