import applayStroke from '../applyStroke';
import { degreesToRadians, drawArc } from '../helpers';

const { abs, PI, sin, cos, max, sign } = Math;
const SlyderMaxValue = 50;

const getCircleArcLength = (measure, attrs) => measure.width + attrs.text.length * attrs.letterSpacing;

const getCircleRadius = (segmentAngle, arcLength) => abs((arcLength * 360) / (2 * PI * segmentAngle));

const drawLetter = (ctx, attrs, arcAttrs) => {
  const direction = sign(arcAttrs.segmentAngle);

  const angleInRadians = degreesToRadians(attrs.letterAngle);

  const letterX = arcAttrs.x - direction * arcAttrs.radius * cos(angleInRadians);
  const letterY = arcAttrs.y + arcAttrs.radius * sin(angleInRadians);

  ctx.fillStyle = attrs.fill || 'black';

  const measure = ctx.measureText(attrs.letter);
  const letterBBox = {
    widthWithSpacing: measure.width + attrs.letterSpacing,
    width: measure.width,
    height: measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent,
  };

  const letterRotationAngle = degreesToRadians(90 - direction * attrs.letterAngle);
  // ctx.rotate(radianAngle);
  // ctx.fillText(letter, letterX, letterY)

  ctx.save();
  ctx.translate(letterX, letterY); // translate to the centerpoint you desire to rotate around
  ctx.rotate(letterRotationAngle); // rotate by the desired angle

  if (attrs.strokeWidth) applayStroke(ctx, attrs.letter, 0, 0, attrs);

  ctx.fillText(attrs.letter, 0, 0);
  ctx.restore(); // always clean up -- reset transformations to default

  return letterBBox;
};

const bendText = (ctx, attrs) => {
  ctx.font = ` ${attrs.bold} ${attrs.italic} ${attrs.fontSize}px ${attrs.font || 'Archivo Black'}`;

  const measure = ctx.measureText(attrs.text);

  const segmentAngle = (360 / SlyderMaxValue) * attrs.bend;
  const absSegmentAngle = abs(segmentAngle);
  const arcLength = getCircleArcLength(measure, attrs);
  const radius = getCircleRadius(segmentAngle, arcLength);

  const fontHeight = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
  const chordLength = sin(degreesToRadians(absSegmentAngle / 2)) * radius * 2;
  const bbox = {
    width: absSegmentAngle < 180 ? chordLength : radius * 2,
    height: max(abs(radius - cos(degreesToRadians(absSegmentAngle / 2)) * radius), fontHeight),
  };
  const xDiff = bbox.width - measure.width + attrs.text.length * attrs.letterSpacing;

  const position = {
    x: 0,
    y: measure.fontBoundingBoxAscent,
  };
  const arcAttrs = drawArc(ctx, position, segmentAngle, arcLength, radius);

  let letterAngle = arcAttrs.startAngle;

  for (let i = 0; i < attrs.text.length; ++i) {
    const letter = attrs.text[i];
    const letterAttrs = {
      ...attrs,
      letter,
      letterAngle,
    };
    const { widthWithSpacing } = drawLetter(ctx, letterAttrs, arcAttrs);

    const diffAngle = (widthWithSpacing * 360) / (2 * PI * radius);
    letterAngle += diffAngle;
  }

  return {
    xDiff,
    yDiff: 0,
    ...bbox,
  };
};

export default bendText;
