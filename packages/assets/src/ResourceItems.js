import React, {useState} from 'react';
import {ResourceItem, ResourceList, Stack} from '@shopify/polaris';
import NotificationsItem from '@assets/components/NotificationsItem';

// eslint-disable-next-line react/prop-types
function ResourceItems({data}) {
  const [selectedIds, setSelectedIds] = useState([]);

  const promotedBulkActions = [{}];
  const formatTimeAgo = timestamp => {
    const convertTime = new Date(timestamp);
    const currentDate = new Date();

    const difference = currentDate - convertTime;

    return Math.floor(difference / (1000 * 60 * 60 * 24));
  };

  const formatDateTime = timestamp => {
    const dateObj = new Date(timestamp);
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    const formattedDate = dateObj.toLocaleDateString(undefined, options);

    return formattedDate;
  };
  const [sortOrder, setSortOrder] = useState('1');

  const handleSortChange = selectedSortOrder => {
    setSortOrder(selectedSortOrder);
  };
  const sortedData = [...data].sort((a, b) => {
    const timestampA = new Date(a.timestamp);
    const timestampB = new Date(b.timestamp);

    if (sortOrder === '1') {
      return timestampB - timestampA;
    } else {
      return timestampA - timestampB;
    }
  });
  return (
    <ResourceList
      items={sortedData}
      promotedBulkActions={promotedBulkActions}
      selectedItems={selectedIds}
      onSelectionChange={setSelectedIds}
      sortOptions={[
        {label: 'Newest update', value: '1'},
        {label: 'Oldest update', value: '2'}
      ]}
      sortValue={sortOrder}
      onSortChange={handleSortChange}
      renderItem={item => {
        const {id, timestamp} = item;
        const formattedTimestamp = formatTimeAgo(timestamp);
        const timeStampFormatted = formatDateTime(timestamp);

        return (
          <div className="Polaris-ResourceItem">
            <ResourceItem id={id}>
              <Stack>
                <Stack.Item fill>
                  <NotificationsItem
                    city={item.city}
                    productName={item.productName}
                    timeStamp={formattedTimestamp}
                    productImage={item.productImage}
                    country={item.country}
                    firstName={item.firstName}
                  />
                </Stack.Item>
                <Stack.Item> {timeStampFormatted}</Stack.Item>
              </Stack>
            </ResourceItem>
          </div>
        );
      }}
    />
  );
}

export default ResourceItems;
