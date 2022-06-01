import Konva from 'konva';
import { useEffect, useState } from 'react';

const useAddTransformer = () => {
  const [transformer, setTransformer] = useState(null);
  useEffect(() => {
    const tr = new Konva.Transformer({});

    setTransformer(tr);
  }, []);

  return transformer;
};

export default useAddTransformer;
