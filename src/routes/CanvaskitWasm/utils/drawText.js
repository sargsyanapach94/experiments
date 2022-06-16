const drawText = (CanvasKit, surface, robotoData) => {
  const canvas = surface.getCanvas();
  canvas.clear(CanvasKit.Color4f(0.9, 0.9, 0.9, 1.0));

  const fontMgr = CanvasKit.FontMgr.FromData([robotoData]);
  const paraStyle = new CanvasKit.ParagraphStyle({
    textStyle: {
      color: CanvasKit.BLACK,
      fontFamilies: ['Roboto'],
      fontSize: 28,
    },
    textAlign: CanvasKit.TextAlign.Left,
  });
  const text = 'Any sufficiently entrenched technology is indistinguishable from Javascript';
  const builder = CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr);
  builder.addText(text);
  const paragraph = builder.build();
  paragraph.layout(290); // width in pixels to use when wrapping text
  canvas.drawParagraph(paragraph, 10, 10);
  surface.flush();
};

export default drawText;
