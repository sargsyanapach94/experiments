import Konva from 'konva';
import { useEffect, useState } from 'react';

const useSetupStage = () => {
  const [layer, setLayer] = useState(null);
  const [stage, setStage] = useState(null);

  useEffect(() => {
    const stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth - 10,
      height: window.innerHeight - 200,
    });
    window.stage = stage;

    const layer = new Konva.Layer();

    stage.add(layer);
    setLayer(layer);
    setStage(stage);
  }, []);

  return {
    layer,
    stage,
  };
};
export default useSetupStage;
