import { useCallback, useEffect, useState } from 'react';

import MyInputRange from '../../common/MyinputRange';
import MyCheckbox from '../../common/MyCheckbox';

import { settings, settingTypes } from './data';
import createLines from './konvaUtils/createVerticalAndHorisontalLines';
import createShapeText from './konvaUtils/createShapeText';
import createTransformer from './konvaUtils/createTransformer';
import useSetupStage from './hooks/useSetupStage';
import useLoadFonts from './hooks/useLoadFonts';

const defaultText = 'The quick brown fox';
// const defaultText = 'The quick brown fox jumps over the lazy dog';

const font = 'Gravura Com';
// const font = 'Archivo Black';
// const font = 'RixGangnamDaero Black';
// const font = 'Monoton';

function ShapeText() {
  const [shapeText, setShapeText] = useState(null);
  const isFontsLoaded = useLoadFonts();
  const { stage, layer } = useSetupStage();

  useEffect(() => {
    if (!stage || !layer || !isFontsLoaded) return;

    const lines = createLines(stage.getSize());
    layer.add(...lines);

    const shapeText = createShapeText({ text: defaultText, font });
    layer.add(shapeText);

    const tr = createTransformer();
    tr.nodes([shapeText]);
    layer.add(tr);
    layer.draw();

    setShapeText(shapeText);
  }, [layer, stage, isFontsLoaded]);

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
        <textarea defaultValue={defaultText} onChange={({ target }) => { changeTextSetting(target.value, 'text'); }} />
      </label>
      {settings.map(setting => {
        if (setting.type === settingTypes.range) { return <MyInputRange setting={setting} onChange={changeTextSetting} key={setting.key} />; }
        if (setting.type === settingTypes.boolean) {
          return <MyCheckbox setting={setting} onChange={changeTextSetting} key={setting.key} />;
        }

        return null;
      })}
      <div style={{ border: '1px solid red', marginTop: '16px' }} id="container" />
    </main>
  );
}

export default ShapeText;
