import {Select} from '@shopify/polaris';
import React, {useCallback} from 'react';

// eslint-disable-next-line react/prop-types
function SelectExample({value, onChange}) {
  const handleSelectChange = useCallback(newValue => onChange(newValue), [onChange]);

  const options = [
    {label: 'All Pages', value: 'all-pages'},
    {label: 'Specific pages', value: 'specific-pages'}
  ];

  return (
    <Select
      label="PAGE RESTRICTION"
      options={options}
      onChange={handleSelectChange}
      value={value}
    />
  );
}

export default SelectExample;
