// import './notificationPopup.scss';
import React from 'react';

const NotificationsPopup = ({notifications, settings, onCloseButtonClick}) => {
  const handleButtonClick = () => {
    if (onCloseButtonClick) {
      onCloseButtonClick();
    }
  };

  return (
    <div className="container">
      <div className="left-column">
        <img src={notifications.productImage} />
      </div>
      <div className="right-column">
        <div className="action-button">
          <button className="close-button" onClick={handleButtonClick}>
            x
          </button>
        </div>
        <div className="information">
          <p>
            {notifications.firstName} in {notifications.city},{notifications.country}
          </p>
          <p className={settings.truncateProductName ? 'truncate' : ''}>
            Purchased {notifications.productName}
          </p>
          <p className={settings.hideTimeAgo ? 'hide' : ''}>{notifications.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPopup;
