import {RangeSlider} from '@shopify/polaris';
import React, {useCallback} from 'react';

function RangeSliderExample({label, helpText, type, value, onChange}) {
  const handleRangeSliderChange = useCallback(
    newValue => {
      onChange(newValue);
    },
    [onChange]
  );
  return (
    <>
      <RangeSlider
        label={label}
        value={value}
        onChange={handleRangeSliderChange}
        suffix={
          <div className="RangeSlideLabelBox">
            <p>
              {value + ' '}
              {type}
            </p>
          </div>
        }
        helpText={helpText}
      />
    </>
  );
}

export default RangeSliderExample;
