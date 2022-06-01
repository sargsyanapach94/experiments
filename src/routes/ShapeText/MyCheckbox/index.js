import { memo, useCallback, useState } from 'react';

function MyCheckbox({ onChange, setting }) {
  const { title, key, defaultValue = 0 } = setting;
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(value => {
    onChange(value, key);
    setValue(value);
  }, [onChange, key]);

  return (
    <div style={{ width: 400, padding: 12 }}>
      <label>
        {' '}
        <input type="checkbox" value={value} onChange={handleChange} />
        {' '}
        {title}
        {' '}
      </label>
    </div>
  );
}

export default memo(MyCheckbox);
