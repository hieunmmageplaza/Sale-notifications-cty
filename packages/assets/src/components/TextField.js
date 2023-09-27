import {TextField} from '@shopify/polaris';
import React, {useCallback} from 'react';

// eslint-disable-next-line react/prop-types
function MultilineFieldExample({label, helpText, value, onChange}) {
  const handleChange = useCallback(newValue => onChange(newValue), [onChange]);

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      multiline={4}
      autoComplete="off"
      helpText={helpText}
    />
  );
}

export default MultilineFieldExample;
