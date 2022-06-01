const applayShadow = (ctx, letter, x, y, attrs) => {
  ctx.shadowColor = attrs.shadowColor || 'black';
  ctx.shadowBlur = 10;
  ctx.lineWidth = 3;
  ctx.strokeText(letter, x + 10, y);
  ctx.shadowBlur = 0;
};
export default applayShadow;
