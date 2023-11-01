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
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  };

  const formatDateTime = timestamp => {
    const dateObj = new Date(timestamp);
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    return dateObj.toLocaleDateString(undefined, options);
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
