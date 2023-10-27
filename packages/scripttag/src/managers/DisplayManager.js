import React from 'react';
import ReactDOM from 'react-dom';
import NotificationsPopup from '../components/NotificationPopup/NotificationsPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = [];
    this.popupFrames = [];
  }

  initialize({notifications, settings}) {
    this.insertContainer(settings);
    const container = document.querySelector('#Avada-SalePop');

    ReactDOM.render(
      <NotificationsPopup
        notifications={notifications[3]}
        settings={settings}
        onCloseButtonClick={this.fadeOut}
      />,
      container
    );

    // this.displayPopup(settings, notifications);
    this.insertCSS();
  }
  displayPopup(settings, notifications) {
    let index = 0;
    const displayDuration = settings.displayDuration * 1000;
    const firstDelay = settings.firstDelay * 1000;
    const container = document.querySelector('#Avada-SalePop');
    setTimeout(() => {
      const intervalId = setInterval(() => {
        this.fadeOut();
        if (index < notifications.length) {
          ReactDOM.render(
            <NotificationsPopup
              notifications={notifications[index]}
              settings={settings}
              onCloseButtonClick={this.fadeOut}
            />,
            container
          );
          index++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            this.fadeOut();
          }, displayDuration);
        }
      }, displayDuration);
    }, firstDelay);
  }

  insertContainer(settings) {
    const popupEl = document.createElement('div');
    popupEl.id = 'Avada-SalePop';
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    popupEl.style.position = 'fixed';
    popupEl.style.zIndex = '1000';
    popupEl.style.transform = 'translate(-1%, -3%)';
    switch (settings.position) {
      case 'bottom-left':
        popupEl.style.bottom = '0';
        popupEl.style.left = '0';
        break;
      case 'bottom-right':
        popupEl.style.bottom = '0';
        popupEl.style.right = '0';
        break;
      case 'top-left':
        popupEl.style.top = '0';
        popupEl.style.left = '0';
        break;
      case 'top-right':
        popupEl.style.top = '0';
        popupEl.style.right = '0';
        break;
      default:
        popupEl.style.bottom = '0';
        popupEl.style.left = '0';
    }

    const targetEl = document.querySelector('body');
    if (targetEl) {
      targetEl.style.position = 'relative';
      targetEl.prepend(popupEl);
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    ReactDOM.unmountComponentAtNode(container);
  }
  insertCSS() {
    const containerDiv = document.querySelector('#Avada-SalePop .container');
    containerDiv.style.display = 'flex';
    containerDiv.style.border = '1px solid #ddd';
    containerDiv.style.borderRadius = '15px';
    containerDiv.style.maxWidth = '400px';
    containerDiv.style.backgroundColor = 'white';

    const leftColumnDiv = document.querySelector('#Avada-SalePop .left-column');
    leftColumnDiv.style.flex = '0 0 100px';
    leftColumnDiv.style.justifyContent = 'center';
    leftColumnDiv.style.alignItems = 'center';
    leftColumnDiv.style.display = 'flex';
    leftColumnDiv.style.minWidth = '120px';

    const imageElement = document.querySelector('#Avada-SalePop img');

    imageElement.style.maxWidth = '90%';
    imageElement.style.height = 'auto';
    imageElement.style.display = 'block';

    const rightColumnDiv = document.querySelector('#Avada-SalePop .right-column');
    rightColumnDiv.style.flex = '1';
    rightColumnDiv.style.boxSizing = 'border-box';
  }
}
