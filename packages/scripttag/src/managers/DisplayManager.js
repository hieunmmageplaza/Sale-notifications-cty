import {render} from 'preact';
import NotificationsPopup from '../components/NotificationPopup/NotificationsPopup';
// import '../components/NotificationPopup/notificationPopup.css';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = [];
  }

  initialize({notifications, settings}) {
    this.insertContainer();
    const container = document.querySelector('#Avada-SalePop');
    container.appendChild(this.createPopUpFrame());
    // // eslint-disable-next-line react/react-in-jsx-scope
    // render(<NotificationsPopup {...notifications} />, container);
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  createPopUpFrame() {
    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';
    containerDiv.style.display = 'flex';
    containerDiv.style.border = '1px solid #ddd';
    containerDiv.style.borderRadius = '15px';
    containerDiv.style.maxWidth = '400px';

    // Create left-column div
    const leftColumnDiv = document.createElement('div');
    leftColumnDiv.className = 'left-column';
    leftColumnDiv.style.flex = '0 0 100px';
    leftColumnDiv.style.justifyContent = 'center';
    leftColumnDiv.style.alignItems = 'center';
    leftColumnDiv.style.display = 'flex';
    leftColumnDiv.style.minWidth = '120px';

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.src =
      'https://cdn.shopify.com/s/files/1/0825/2578/2299/files/Main.jpg?v=1694662733';
    imageElement.style.maxWidth = '100%';
    imageElement.style.height = 'auto';
    imageElement.style.display = 'block';

    // Append image to left-column div
    leftColumnDiv.appendChild(imageElement);

    // Create right-column div
    const rightColumnDiv = document.createElement('div');
    rightColumnDiv.className = 'right-column';
    rightColumnDiv.style.flex = '1';
    rightColumnDiv.style.boxSizing = 'border-box';

    // Create paragraphs for right-column div
    const paragraphs = [
      'Steve in Shippington, United States',
      'Purchased The Collection Snowboard: Hydrogen',
      'a day ago'
    ];

    paragraphs.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      rightColumnDiv.appendChild(paragraph);
    });

    // Append left-column and right-column to container div
    containerDiv.appendChild(leftColumnDiv);
    containerDiv.appendChild(rightColumnDiv);

    // Append container div to the body or any other desired parent element
    return containerDiv;
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = 'Avada-SalePop';
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    popupEl.style.position = 'absolute';
    popupEl.style.top = '0';
    popupEl.style.left = '0';

    const targetEl = document.querySelector('body').firstChild;
    targetEl.style.position = 'relative';
    if (targetEl) {
      targetEl.append(popupEl);
    }
  }
}
