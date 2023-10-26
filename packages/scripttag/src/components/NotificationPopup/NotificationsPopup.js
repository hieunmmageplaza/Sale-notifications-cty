// import './notificationPopup.scss';
import React from 'react';

const NotificationsPopup = ({notifications, settings}) => {
  console.log('123');
  console.log(notifications);

  return (
    <div className="container">
      <div className="left-column">
        <img src={notifications.productImage} />
      </div>
      <div className="right-column">
        <p>
          {notifications.firstName} in {notifications.city},{notifications.country}
        </p>
        <p className={settings.truncateProductName ? 'truncate' : ''}>
          Purchased {notifications.productName}
        </p>
        <p className={settings.hideTimeAgo ? 'hide' : ''}>{notifications.timestamp}</p>
      </div>
    </div>
  );
};

export default NotificationsPopup;
