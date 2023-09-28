import React from 'react';
import './DesktopPosition.css';

function DesktopPosition({position = '_bottom_left', selected = false, onChange = () => {}}) {
  return (
    <div
      className={`Mageplaza-DesktopPosition ${selected ? '_selected' : ''}`}
      onClick={() => onChange(position)}
    >
      <div
        className={`Mageplaza-DesktopPosition__Item ${position} ${selected ? '_selected' : ''}`}
      ></div>
    </div>
  );
}

export default DesktopPosition;
