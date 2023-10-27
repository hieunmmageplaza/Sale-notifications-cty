import React from 'react';
import './NotificationItem.css';
function NotificationsItem({
  city = 'test',
  country = 'test',
  productName = 'test',
  productImage = '',
  timeStamp = 'test',
  firstName = 'test'
}) {
  return (
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
  );
}

export default NotificationsItem;
