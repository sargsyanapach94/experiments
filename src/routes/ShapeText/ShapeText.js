import { useCallback, useEffect, useState } from 'react';

import MyInputRange from '../../common/MyinputRange';

import { settings } from './data';
import createLines from './konvaUtils/createVerticalAndHorisontalLines';
import createShapeText from './konvaUtils/createShapeText';
import createTransformer from './konvaUtils/createTransformer';
import useSetupStage from './hooks/useSetupStage';

function ShapeText() {
  const [shapeText, setShapeText] = useState(null);

  const { stage, layer } = useSetupStage();

  useEffect(() => {
    if (!stage || !layer) return;

    const lines = createLines(stage.getSize());
    layer.add(...lines);

    const shapeText = createShapeText();
    layer.add(shapeText);

    const tr = createTransformer();
    tr.nodes([shapeText]);
    layer.add(tr);
    layer.draw();

    setShapeText(shapeText);
  }, [layer, stage]);

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
