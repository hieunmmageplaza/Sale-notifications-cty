import React from 'react';
import ReactDOM from 'react-dom';
import NotificationsPopup from '../components/NotificationPopup/NotificationsPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = [];
  }

  initialize({notifications, settings}) {
    this.insertContainer(settings);
    this.displayPopup(settings, notifications);
  }
  displayPopup(settings, notifications) {
    let index = 0;
    const displayDuration = settings.displayDuration * 1000;
    const firstDelay = settings.firstDelay * 1000;
    const popupInterval = settings.popInterval * 1000;
    setTimeout(() => {
      const intervalId = setInterval(() => {
        if (index < notifications.length) {
          console.log(index);
          this.fadeOut();
          this.renderComponent({notifications, settings, index});
          index++;
        } else {
          clearInterval(intervalId);
          this.fadeOut();
        }
      }, displayDuration);
    }, firstDelay);
  }

  renderComponent({notifications, settings, index}) {
    const container = document.querySelector('#Avada-SalePop');

    ReactDOM.render(
      <NotificationsPopup
        notifications={notifications[index]}
        settings={settings}
        onCloseButtonClick={this.fadeOut}
      />,
      container
    );
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
}
