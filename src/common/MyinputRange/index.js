import { memo, useCallback, useState } from 'react';
import InputRange from 'react-input-range';

function MyInputRange({ onChange, setting }) {
  const { title, key, defaultValue = 0, min = 0, max = 50 } = setting;
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(value => {
    onChange(value, key);
    setValue(value);
  }, [onChange, key]);

  return (
    <div style={{ width: 300, padding: 12, display: 'inline-block' }}>
      <p>{title}</p>
      <InputRange
        maxValue={max}
        minValue={min}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default memo(MyInputRange);
