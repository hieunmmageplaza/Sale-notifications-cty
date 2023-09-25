import {TextField} from '@shopify/polaris';
import React, {useCallback} from 'react';

function MultilineFieldExample({label, helpText, value, onchange}) {
  const handleChange = useCallback(newValue => onchange(newValue), [onchange]);

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
