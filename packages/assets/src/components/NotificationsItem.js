import React from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {Icon} from '@shopify/polaris';

// eslint-disable-next-line react/prop-types
function NotificationsItem({text1, text2, text4, media}) {
  return (
    <>
      <div className="Polaris-NotificationsItem container">
        <div className="left">
          <img src={media} alt="Hình ảnh" width="100%" />
        </div>
        <div className="middle">
          <h3>{text1}</h3>
          <b>{text2}</b>
          <p>{text4}</p>
        </div>
        <div className="right">
          <button className="top-button">x</button>
          <div className="bottom-button">
            <Icon source={TickMinor} color="base" />
            By Avada
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationsItem;
