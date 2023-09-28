import {BOTTOM_LEFT, BOTTOM_RIGHT, TOP_LEFT, TOP_RIGHT} from '@assets/const/defaultSetting';

export const defaultSettings = {
  position: 'bottom-left',
  allowShow: 'all',
  displayDuration: 3,
  excludeUrls: '',
  includeUrls: '',
  firstDelay: 3,
  hideTimeAgo: false,
  maxPopsDisplay: 3,
  popInterval: 10,
  truncateProductName: false
};

export const desktopPositions = [
  {position: TOP_LEFT},
  {position: TOP_RIGHT},
  {position: BOTTOM_LEFT},
  {position: BOTTOM_RIGHT}
];

const tabs = [
  {
    id: 'display-tab',
    content: 'Display',
    accessibilityLabel: 'All customers',
    panelID: 'all-customers-content-1'
  },
  {
    id: 'triggers-tab',
    content: 'Triggers',
    panelID: 'accepts-marketing-content-1'
  }
];
