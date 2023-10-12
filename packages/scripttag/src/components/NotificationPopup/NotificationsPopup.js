import {h} from 'https://esm.sh/preact';

import './notificationPopup.css';

const NotificationsPopup = notifications => {
  return (
    <div className="container">
      <div className="left-column">
        <img src="https://cdn.shopify.com/s/files/1/0825/2578/2299/files/Main.jpg?v=1694662733" />
      </div>
      <div className="right-column">
        <p>Steve in Shippington,United States</p>
        <p>Purchased The Collection Snowboard: Hydrogen</p>
        <p>a day ago</p>
      </div>
    </div>
  );
};

export default NotificationsPopup;
