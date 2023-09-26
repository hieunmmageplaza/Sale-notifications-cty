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
import DisplayPositionItem from './components/DisplayPositionItem';
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

  const {data} = useFetchApi({url: '/notifications'});

  console.log('data' + data);
  const [hideTimeAgo, setHideTimeAgo] = useState(false);
  const [truncateProductName, setTruncateProductName] = useState(false);
  const [firstDelay, setFirstDelay] = useState(3);
  const [displayDuration, setDisplayDuration] = useState(3);
  const [popsInterval, setPopsInterval] = useState(10);
  const [maxPopsDisplay, setMaxPopsDisplay] = useState(3);
  // const [displayPositionValue, setDisplayPositionValue] = useState('bottom-left');
  const [allowShow, setAllowShow] = useState('all-pages');
  const [includedPages, setIncludedPages] = useState('');
  const [excludedPages, setExcludedPages] = useState('');
  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);
  const [currentPage, setCurrentPage] = useState('actualPage');

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
  const handleSave = () => {
    console.log('Display duration:', displayDuration);
    console.log('delay:', firstDelay);
    console.log('popsInterval:', popsInterval);
    console.log('maxPopsDisplay:', maxPopsDisplay);
    console.log('hideTimeAgo:', hideTimeAgo);
    console.log('truncateProductName:', truncateProductName);
    console.log('allowShow:', allowShow);
    console.log('includedPages:', includedPages);
    console.log('excludedPages:', excludedPages);
  };
  const settingPage = (
    <Page
      title="Setting"
      subtitle="Decide how your notifications will display"
      fullWidth
      primaryAction={{
        content: 'Save',
        onClick: () => handleSave()
      }}
    >
      <Layout>
        <Layout.Section secondary>
          <Card>
            <div className="Polaris-ResourceItem">
              <NotificationsItem
                text1="ahihi"
                text2="ahhiii2"
                text4="agghh3"
                media="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              />
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <Card.Section>
                {selected === 0 && (
                  <React.Fragment>
                    <DisplayText size="small">APPEARANCE</DisplayText>
                    <p> Desktop Position</p>
                    <div className="Polaris-DisplayPositionItem">
                      <DisplayPositionItem />
                    </div>
                    <CheckboxExample
                      label="Hide time ago"
                      checked={hideTimeAgo}
                      onchange={setHideTimeAgo}
                    />
                    <br />
                    <CheckboxExample
                      label="Truncate content text"
                      checked={truncateProductName}
                      onchange={setTruncateProductName}
                      helpText="If your product name is long for one line, it will be truncated to 'Prodcut na...'"
                    />
                    <DisplayText size="small">TIMING</DisplayText>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div className="custom-range-slider">
                              <RangeSliderExample
                                label="Display duration"
                                helpText="How long each pop will display on your page"
                                type="second(s)"
                                value={displayDuration}
                                onChange={setDisplayDuration}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="custom-range-slider">
                              <RangeSliderExample
                                label="Time before the firt pop"
                                helpText="The delay time before the first notification"
                                type="second(s)"
                                value={firstDelay}
                                onChange={setFirstDelay}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td>
                            <div className="custom-range-slider">
                              <RangeSliderExample
                                label="Gap time between two pops"
                                helpText="The time interval between two popup notifications"
                                type="second(s)"
                                value={popsInterval}
                                onChange={setPopsInterval}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="custom-range-slider">
                              <RangeSliderExample
                                label="Maximum of popups"
                                helpText="The maximum number of popups are allowed to show after..."
                                type="pop(s)"
                                value={maxPopsDisplay}
                                onChange={setMaxPopsDisplay}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </React.Fragment>
                )}
                {selected === 1 && (
                  <React.Fragment>
                    <SelectExample value={allowShow} onchange={setAllowShow} />
                    <FormLayout>
                      {allowShow === 'specific-pages' && (
                        <MultilineFieldExample
                          label="Included pages"
                          value={includedPages}
                          onchange={setIncludedPages}
                          helpText="Page URLs to show the pop-up (separated by new lines)"
                        />
                      )}
                      <MultilineFieldExample
                        label="Excluded pages"
                        helpText="Page URLs NOT to show the pop-upp (separated by new lines)"
                        value={excludedPages}
                        onchange={setExcludedPages}
                      />
                    </FormLayout>
                  </React.Fragment>
                )}
              </Card.Section>
            </Tabs>
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
