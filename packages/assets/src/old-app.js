import './App.css';
import {
  AppProvider,
  Card,
  DisplayText,
  FormLayout,
  Frame,
  Layout,
  Navigation,
  Page,
  SettingToggle,
  Tabs,
  TextStyle,
  TopBar
} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import React, {useCallback, useEffect, useState} from 'react';
import ResourceItems from './ResourceItems';
import SelectExample from './components/SelectInput';
import CheckboxExample from './components/CheckBox';
import RangeSliderExample from './components/RangeSlider';
import DesktopPosition from './components/DesktopPosition/DesktopPosition';
import {HomeMajor, NotificationMajor, SettingsMajor} from '@shopify/polaris-icons';
import NotificationsItem from './components/NotificationsItem';
import MultilineFieldExample from './components/TextField';
import {api} from '@assets/helpers';
import useFetchApi from '@assets/hooks/api/useFetchApi';

function App() {
  const [selected, setSelected] = useState(0);
  const [enabled, setEnabled] = useState(false);
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


  const navigationMarkup = (
    <Navigation>
      <Navigation.Section
        items={[
          {
            label: 'Home',
            icon: HomeMajor,
            onClick: () => setCurrentPage('actualPage')
          },
          {
            label: 'Notifications',
            icon: NotificationMajor,
            onClick: () => setCurrentPage('page1')
          },
          {
            label: 'Settings',
            icon: SettingsMajor,
            onClick: () => setCurrentPage('page3')
          }
        ]}
      />
    </Navigation>
  );

  const homePage = (
    <Page title="Home">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <TextStyle>
              App status is <b>{enabled ? 'enabledz' : 'disabl123sssssezzzd'}</b>
            </TextStyle>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
  const notificationPage = (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <ResourceItems />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
  const pageMarkup = (() => {
    switch (currentPage) {
      case 'actualPage':
        return homePage;
      case 'page1':
        return notificationPage;
      case 'page3':
        return settingPage;
      default:
        return currentPage;
    }
  })();

  const userMenuMarkup = <TopBar.UserMenu name="Avada" initials="A" actions={null} />;

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <>
      <AppProvider i18n={en}>
        {/* <NavigationE children={<PageContent/>}/>*/}
        <Frame topBar={topBarMarkup} navigation={navigationMarkup}>
          {pageMarkup}
        </Frame>
      </AppProvider>
    </>
  );
}

export default App;
