import Konva from 'konva';
import { useCallback, useEffect, useState } from 'react';

import useAddShapeText from './hooks/useAddShapeText';
import useAddTransformer from './hooks/useAddTransformer';
import { loadFont } from './utils/helpers';
import MyInputRange from './MyinputRange';
import { settings } from './data';
import createLines from './konvaUtils/createVerticalAndHorisontalLines';

function ShapeText() {
  const [layer, setLayer] = useState(null);
  const [stage, setStage] = useState(null);
  const [shapeText, setShapeText] = useState(null);

  window.stage = stage;
  useEffect(() => {
    // loadFont('RixGangnamDaero Black', "https://pastatic.picsart.com/44013384117806366849.ttf");
    loadFont('Gravura Com', 'https://cdn111.picsart.com/36521763418711830398.ttf');
    loadFont('Monoton', 'https://pastatic.picsart.com/79881694122579258699.ttf');
    loadFont('Archivo Black', 'https://pastatic.picsart.com/82619001327360539306.ttf');

    const stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth - 10,
      height: window.innerHeight - 200,
    });

    const layer = new Konva.Layer();

    stage.add(layer);
    setLayer(layer);
    setStage(stage);
  }, []);

  const transformer = useAddTransformer(layer);
  const { addShapeText } = useAddShapeText();

  useEffect(() => {
    if (!stage || !layer) return;

    const lines = createLines(stage.getSize());
    layer.add(...lines);

    const shapeText = addShapeText();
    layer.add(shapeText);

    if (transformer) {
      layer.add(transformer);
      transformer.nodes([shapeText]);
      layer.draw();
    }

    setShapeText(shapeText);
  }, [layer, transformer, addShapeText, stage]);

  const changeTextSetting = useCallback((value, key) => {
    shapeText.setAttrs({
      [key]: value,
    });
  }, [shapeText]);

  return (
    <main>
      <h3>Shape Text</h3>
      <label>
        Text:
        <textarea onChange={({ target }) => { changeTextSetting(target.value, 'text'); }} />
      </label>
      {settings.map(setting => <MyInputRange setting={setting} onChange={changeTextSetting} key={setting.key} />)}
      <div style={{ border: '1px solid red', marginTop: '16px' }} id="container" />
    </main>
  );
}

export default ShapeText;
