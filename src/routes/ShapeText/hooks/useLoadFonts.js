import { useEffect } from 'react';

import { loadFont } from '../utils/helpers';

const useLoadFonts = () => {
  useEffect(() => {
    // loadFont('RixGangnamDaero Black', "https://pastatic.picsart.com/44013384117806366849.ttf");
    loadFont('Gravura Com', 'https://cdn111.picsart.com/36521763418711830398.ttf');
    loadFont('Monoton', 'https://pastatic.picsart.com/79881694122579258699.ttf');
    loadFont('Archivo Black', 'https://pastatic.picsart.com/82619001327360539306.ttf');
  }, []);
};

export default useLoadFonts;
