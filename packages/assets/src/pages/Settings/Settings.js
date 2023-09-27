import React, {useCallback, useState} from 'react';
import {Card, DisplayText, FormLayout, Layout, Page, Tabs} from '@shopify/polaris';
import NotificationsItem from '@assets/components/NotificationsItem';
import DisplayPositionItem from '@assets/components/DisplayPositionItem';
import CheckboxExample from '@assets/components/CheckBox';
import RangeSliderExample from '@assets/components/RangeSlider';
import SelectExample from '@assets/components/SelectInput';
import MultilineFieldExample from '@assets/components/TextField';
import '../../App.css';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import defaultSetting from '@avada/functions/src/const/settings/defaultSetting';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const handleSave = () => {
    console.log('Display duration:', settings.displayDuration);
    console.log('delay:', settings.firstDelay);
    console.log('popsInterval:', settings.popInterval);
    console.log('maxPopsDisplay:', settings.maxPopsDisplay);
    console.log('hideTimeAgo:', settings.hideTimeAgo);
    console.log('truncateProductName:', settings.truncateProductName);
    console.log('allowShow:', settings.allowShow);
    console.log('includedPages:', settings.includeUrls);
    console.log('excludedPages:', settings.excludeUrls);
  };

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
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  // const {loading, data: input, setData: setInput, setLoading} = useFetchApi(
  //   '/settings',
  //   defaultSetting
  // );
  const [settings, setSettings] = useState(defaultSetting);
  const handleChangeInput = (key, value) => {
    const updatedSettings = {...settings, [key]: value};
    setSettings(updatedSettings);
  };
  return (
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
                city="HoChiMinh"
                country="VietNam"
                productName="Fusion Backpack"
                timeStamp="10"
                productImage="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
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
                      checked={settings.hideTimeAgo}
                      onChange={value => handleChangeInput('hideTimeAgo', value)}
                    />
                    <br />
                    <CheckboxExample
                      label="Truncate content text"
                      checked={settings.truncateProductName}
                      onChange={value => handleChangeInput('truncateProductName', value)}
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
                                value={settings.displayDuration}
                                onChange={value => handleChangeInput('displayDuration', value)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="custom-range-slider">
                              <RangeSliderExample
                                label="Time before the firt pop"
                                helpText="The delay time before the first notification"
                                type="second(s)"
                                value={settings.firstDelay}
                                onChange={value => handleChangeInput('firstDelay', value)}
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
                                value={settings.popInterval}
                                onChange={value => handleChangeInput('popInterval', value)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="custom-range-slider">
                              <RangeSliderExample
                                label="Maximum of popups"
                                helpText="The maximum number of popups are allowed to show after..."
                                type="pop(s)"
                                value={settings.maxPopsDisplay}
                                onChange={value => handleChangeInput('maxPopsDisplay', value)}
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
                    <SelectExample
                      value={settings.allowShow}
                      onChange={value => handleChangeInput('allowShow', value)}
                    />
                    <FormLayout>
                      {settings.allowShow === 'specific-pages' && (
                        <MultilineFieldExample
                          label="Included pages"
                          value={settings.includeUrls}
                          onChange={value => handleChangeInput('includeUrls', value)}
                          helpText="Page URLs to show the pop-up (separated by new lines)"
                        />
                      )}
                      <MultilineFieldExample
                        label="Excluded pages"
                        helpText="Page URLs NOT to show the pop-upp (separated by new lines)"
                        value={settings.excludeUrls}
                        onChange={value => handleChangeInput('excludeUrls', value)}
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
}

Settings.propTypes = {};
