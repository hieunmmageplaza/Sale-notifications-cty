// import '../components/NotificationPopup/notificationPopup.css';
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

    for (let i = 0; i < notifications.length; i++) {
      this.popupFrames.push(this.createPopUpFrame(notifications[i]));
    }
    // this.showPopUp(settings);
    // container.appendChild(this.popupFrames[1]);
    // this.displayPopup(settings, notifications);
    // ReactDOM.render(
    //   <NotificationsPopup notifications={notifications[0]} settings={settings} />,
    //   container
    // );
    this.insertCSS();
    this.applySettingsForPopup(settings);
  }
  displayPopup(settings, notifications) {
    let index = 0;
    const displayDuration = settings.displayDuration * 1000;
    const firstDelay = settings.firstDelay * 1000;
    const container = document.querySelector('#Avada-SalePop');
    setTimeout(() => {
      const intervalId = setInterval(() => {
        container.innerHTML = '';
        if (index < notifications.length) {
          ReactDOM.render(
            <NotificationsPopup notifications={notifications[index]} settings={settings} />,
            container
          );
          this.insertCSS();
          index++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            container.innerHTML = '';
          }, displayDuration);
        }
      }, displayDuration);
    }, 1);
  }

  showPopUp(settings, notifications) {
    let index = 0;
    const displayDuration = settings.displayDuration * 1000;
    const firstDelay = settings.firstDelay * 1000;
    const container = document.querySelector('#Avada-SalePop');
    setTimeout(() => {
      const intervalId = setInterval(() => {
        container.innerHTML = '';
        if (index < this.popupFrames.length) {
          container.appendChild(this.popupFrames[index]);
          this.insertCSS();
          index++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            container.innerHTML = '';
          }, displayDuration);
        }
      }, displayDuration);
    }, 1);
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

  applySettingsForPopup(settings) {
    const customerSeccondLine = document.querySelector(
      '#Avada-SalePop .container .right-column .Customer-information-line-2'
    );
    const customerThirdLine = document.querySelector(
      '#Avada-SalePop .container .right-column .Customer-information-line-3'
    );

    if (settings.truncateProductName) {
      customerSeccondLine.classList.add('truncate');
    }

    if (settings.hideTimeAgo) {
      customerThirdLine.classList.add('hide');
    }
  }

  createPopUpFrame(notification) {
    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    // Create left-column div
    const leftColumnDiv = document.createElement('div');
    leftColumnDiv.className = 'left-column';

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.src = notification.productImage;
    // Append image to left-column div
    leftColumnDiv.appendChild(imageElement);

    // Create right-column div
    const rightColumnDiv = document.createElement('div');
    rightColumnDiv.className = 'right-column';

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'x';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
      this.fadeOut();
    });

    rightColumnDiv.appendChild(closeButton);

    const firstLine = `${notification.firstName} in ${notification.city}, ${notification.country}`;
    const secondLine = `Purchased ${notification.productName}`;
    const thirdLine = notification.timestamp;
    const paragraphs = [firstLine, secondLine, thirdLine];

    paragraphs.forEach((text, index) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      paragraph.classList.add(`Customer-information-line-${index + 1}`);

      rightColumnDiv.appendChild(paragraph);
      paragraph.style.margin = '0';
      paragraph.style.padding = '0';
    });

    containerDiv.appendChild(leftColumnDiv);
    containerDiv.appendChild(rightColumnDiv);

    return containerDiv;
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
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

    const closeButton = document.querySelector('#Avada-SalePop .close-button');
    closeButton.style.position = 'absolute';
    closeButton.style.top = '8px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'white';
    closeButton.style.border = '0';
    closeButton.style.cursor = 'pointer';
  }
}
