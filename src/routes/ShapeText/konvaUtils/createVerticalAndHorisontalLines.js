import Konva from 'konva';

const createVerticalAndHorisontalLines = stageSize => {
  if (!stageSize) return;

  const veritical = new Konva.Line({
    points: [stageSize.width / 2, 0, stageSize.width / 2, stageSize.height],
    stroke: 'red',
    // tension: 1
  });

  const horisontal = new Konva.Line({
    points: [0, stageSize.height / 2, stageSize.width, stageSize.height / 2],
    stroke: 'red',
    // tension: 1
  });

  return [veritical, horisontal];
};

export default createVerticalAndHorisontalLines;
