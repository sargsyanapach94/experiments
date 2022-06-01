const applyTexture = (ctx, img, attrs, width, height) => {
  ctx.save();
  // use compositing to draw the background image
  // only where the text has been drawn
  ctx.beginPath();
  ctx.globalCompositeOperation = 'source-in';
  ctx.drawImage(img, 0, 0, img.width, img.height, attrs.x, attrs.y, width * 2, height * 2);
  ctx.restore();
};

export default applyTexture;
