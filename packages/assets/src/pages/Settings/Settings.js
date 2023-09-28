import React, {useCallback, useState} from 'react';
import {
  Card,
  DisplayText,
  FormLayout,
  Layout,
  Page,
  Stack,
  Tabs,
  TextStyle
} from '@shopify/polaris';
import NotificationsItem from '@assets/components/NotificationsItem';
import DesktopPosition from '@assets/components/DesktopPosition/DesktopPosition';
import CheckboxExample from '@assets/components/CheckBox';
import RangeSliderExample from '@assets/components/RangeSlider';
import SelectExample from '@assets/components/SelectInput';
import MultilineFieldExample from '@assets/components/TextField';
import '../../App.css';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {defaultSettings, desktopPositions} from '@assets/config/settingsConfig';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const handleSave = () => {
    console.log('Display duration:', input.displayDuration);
    console.log('delay:', input.firstDelay);
    console.log('popsInterval:', input.popInterval);
    console.log('maxPopsDisplay:', input.maxPopsDisplay);
    console.log('hideTimeAgo:', input.hideTimeAgo);
    console.log('truncateProductName:', input.truncateProductName);
    console.log('allowShow:', input.allowShow);
    console.log('includedPages:', input.includeUrls);
    console.log('excludedPages:', input.excludeUrls);
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

  const {data: input, setData: setInput, loading, setLoading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  const handleChangeInput = (key, value) => {
    const updatedSettings = {...input, [key]: value};
    setInput(updatedSettings);
  };
  console.log(input);

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
        <Layout.Section oneThird>
          <NotificationsItem
            city="HoChiMinh"
            country="VietNam"
            productName="Fusion Backpack"
            timeStamp="10"
            productImage="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <Card.Section title={'APPEARANCE'}>
                <TextStyle>Desktop position</TextStyle>
                <Stack>
                  {desktopPositions?.map((item, index) => (
                    <Stack.Item key={index}>
                      <DesktopPosition
                        position={item.position}
                        selected={input.position === item.position}
                        onChange={value => handleChangeInput('position', value)}
                      />
                    </Stack.Item>
                  ))}
                </Stack>
                <Stack>
                  <Stack.Item fill>
                    <RangeSliderExample
                      label="Display duration"
                      helpText="How long each pop will display on your page"
                      type="second(s)"
                      value={input.displayDuration}
                      onChange={value => handleChangeInput('displayDuration', value)}
                    />
                  </Stack.Item>
                  <Stack.Item fill>
                    <RangeSliderExample
                      label="Display duration"
                      helpText="How long each pop will display on your page"
                      type="second(s)"
                      value={input.displayDuration}
                      onChange={value => handleChangeInput('displayDuration', value)}
                    />
                  </Stack.Item>
                </Stack>
                <Stack>
                  <Stack.Item fill>
                    <RangeSliderExample
                      label="Display duration"
                      helpText="How long each pop will display on your page"
                      type="second(s)"
                      value={input.displayDuration}
                      onChange={value => handleChangeInput('displayDuration', value)}
                    />
                  </Stack.Item>
                  <Stack.Item fill>
                    <RangeSliderExample
                      label="Display duration"
                      helpText="How long each pop will display on your page"
                      type="second(s)"
                      value={input.displayDuration}
                      onChange={value => handleChangeInput('displayDuration', value)}
                    />
                  </Stack.Item>
                </Stack>
              </Card.Section>
              <Card.Section>
                {selected === 0 && (
                  <React.Fragment>
                    <DisplayText size="small">APPEARANCE</DisplayText>
                    <p> Desktop Position</p>
                    <CheckboxExample
                      label="Hide time ago"
                      checked={input.hideTimeAgo}
                      onChange={value => handleChangeInput('hideTimeAgo', value)}
                    />
                    <br />
                    <CheckboxExample
                      label="Truncate content text"
                      checked={input.truncateProductName}
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
                                value={input.displayDuration}
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
                                value={input.firstDelay}
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
                                value={input.popInterval}
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
                                value={input.maxPopsDisplay}
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
                      value={input.allowShow}
                      onChange={value => handleChangeInput('allowShow', value)}
                    />
                    <FormLayout>
                      {input.allowShow === 'specific-pages' && (
                        <MultilineFieldExample
                          label="Included pages"
                          value={input.includeUrls}
                          onChange={value => handleChangeInput('includeUrls', value)}
                          helpText="Page URLs to show the pop-up (separated by new lines)"
                        />
                      )}
                      <MultilineFieldExample
                        label="Excluded pages"
                        helpText="Page URLs NOT to show the pop-upp (separated by new lines)"
                        value={input.excludeUrls}
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
