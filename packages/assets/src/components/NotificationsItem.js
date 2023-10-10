import React from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {Icon} from '@shopify/polaris';

// eslint-disable-next-line react/prop-types
function NotificationsItem({city, country, productName, productImage, timeStamp}) {
  return (
    <>
      <div className="Polaris-NotificationsItem container">
        <div className="left">
          <img src={productImage} alt="Hình ảnh" width="100%" />
        </div>
        <div className="middle">
          <h3>{city + ',' + country}</h3>
          <b>{productName}</b>
          <p>{timeStamp}</p>
        </div>
        <div className="right">
          <button className="top-button">x</button>
          <div className="bottom-button">
            By Avada
            <Icon source={TickMinor} color="base" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationsItem;
