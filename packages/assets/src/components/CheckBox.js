import {Checkbox} from '@shopify/polaris';
import React, {useCallback} from 'react';

// eslint-disable-next-line react/prop-types
function CheckboxExample({label, checked, helpText, onchange}) {
  const handleChange = useCallback(
    newChecked => {
      onchange(newChecked);
    },
    [onchange]
  );

  return <Checkbox label={label} checked={checked} onChange={handleChange} helpText={helpText} />;
}

export default CheckboxExample;
