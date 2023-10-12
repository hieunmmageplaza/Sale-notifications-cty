import {render} from 'https://esm.sh/preact';
import NotificationsPopup from '../components/NotificationPopup/NotificationsPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = [];
  }

  initialize({notifications, settings}) {
    this.insertContainer();
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationsPopup />, container);
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display({notifications}) {
    const container = document.querySelector('#Avada-SalePop');
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<NotificationsPopup {...notifications} />, container);
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = 'Avada-SalePop';
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      // insertAfter(popupEl, targetEl);
      targetEl.append(popupEl);
    }
    return popupEl;
  }
}
