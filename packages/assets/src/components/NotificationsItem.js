import React from 'react';
import {TickMinor} from '@shopify/polaris-icons';
import {Icon} from '@shopify/polaris';
import './NotificationItem.css';

// eslint-disable-next-line react/prop-types
function NotificationsItem({city, country, productName, productImage, timeStamp, firstName}) {
  return (
    <>
      <div className="container">
        <div className="left-column">
          <img src={productImage} alt="Your Image" />
        </div>
        <div className="right-column">
          <p>
            {firstName} in {city},{country}
          </p>
          <p className="truncate">Purchased {productName}</p>
          <p>{timeStamp}</p>
        </div>
      </div>
    </>
  );
}

export default NotificationsItem;
