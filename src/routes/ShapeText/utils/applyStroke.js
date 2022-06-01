const applayStroke = (ctx, letter, x, y, attrs) => {
  ctx.strokeStyle = attrs.stroke || attrs.fill;
  ctx.lineWidth = attrs.strokeWidth || 0;
  ctx.strokeText(letter, x, y);
};

export default applayStroke;
