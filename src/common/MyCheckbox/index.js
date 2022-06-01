import { memo, useCallback, useState } from 'react';

function MyCheckbox({ onChange, setting }) {
  const { title, key, defaultValue = 0 } = setting;
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(e => {
    const newVal = e.target.checked;
    onChange(newVal, key);
    setValue(newVal);
  }, [onChange, key]);

  return (
    <div style={{ width: 400, padding: 12 }}>
      <label>
        <input type="checkbox" checked={value} onChange={handleChange} />
        {title}
      </label>
    </div>
  );
}

export default memo(MyCheckbox);
