export const settingTypes = {
  boolean: 'boolean',
  range: 'range',
};

export const settings = [
  {
    type: settingTypes.range,
    title: 'Font Size',
    key: 'fontSize',
    defaultValue: 50,
    min: 0,
    max: 180,
  },
  {
    type: settingTypes.range,
    title: 'Letter spacing',
    key: 'letterSpacing',
    defaultValue: 0,
    min: -5,
    max: 20,
  },
  {
    type: settingTypes.range,
    title: 'Strok size',
    key: 'strokeWidth',
    defaultValue: 0,
    min: 0,
    max: 20,
  },
  {
    type: settingTypes.range,
    title: 'Bend',
    key: 'bend',
    defaultValue: 0,
    min: -50,
    max: 50,
  },

  {
    type: settingTypes.boolean,
    title: 'Bold',
    key: 'bold',
    defaultValue: false,
  },

  {
    type: settingTypes.boolean,
    title: 'Italic',
    key: 'italic',
    defaultValue: false,
  },
];
