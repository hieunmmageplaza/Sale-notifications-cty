import React, {useState} from 'react';
import {ResourceItem, ResourceList, Stack} from '@shopify/polaris';
import NotificationsItem from './components/NotificationsItem';

function ResourceItems() {
  const [selectedIds, setSelectedIds] = useState([]);

  const [testItems, setTestItems] = useState([
    {
      id: 1,
      text1: 'Someone in New York, United States1',
      text2: 'Puschased Sport Senaker',
      text3: 'From March 8 ,2021',
      text4: 'a day ago',
      media: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg'
    },
    {
      id: 2,
      text1: 'Someone in New York, United States2',
      text2: 'Puschased Sport Senaker',
      text3: 'From March 8 ,2021',
      text4: 'a day ago',
      media: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg'
    },
    {
      id: 3,
      text1: 'Someone in New York, United States3',
      text2: 'Purchased Sport Sneaker',
      text3: 'From March 8 ,2021',
      text4: 'a day ago',
      media: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg'
    }
  ]);

  const promotedBulkActions = [
    {
      // content: 'Complete',
      // onAction:
    },
    {
      // content: 'Remove',
      // onAction:
    }
  ];

  return (
    <ResourceList
      items={testItems}
      promotedBulkActions={promotedBulkActions}
      selectedItems={selectedIds}
      onSelectionChange={setSelectedIds}
      sortOptions={[
        {label: 'Newest update', value: '1'},
        {label: 'Oldest update', value: '2'}
      ]}
      renderItem={item => {
        const {id, text1, text2, text3, text4, media} = item;
        return (
          <div className="Polaris-ResourceItem">
            <ResourceItem id={id}>
              <Stack>
                <Stack.Item fill>
                  <NotificationsItem text1={text1} text2={text2} text4={text4} media={media} />
                </Stack.Item>
                <Stack.Item>{text3}</Stack.Item>
              </Stack>
            </ResourceItem>
          </div>
        );
      }}
    />
  );
}

export default ResourceItems;
