import {Checkbox} from '@shopify/polaris';
import React, {useCallback} from 'react';

// eslint-disable-next-line react/prop-types
function CheckboxExample({label, checked, helpText, onChange}) {
  const handleChange = useCallback(
    newChecked => {
      onChange(newChecked);
    },
    [onChange]
  );

  return <Checkbox label={label} checked={checked} onChange={handleChange} helpText={helpText} />;
}

export default CheckboxExample;
