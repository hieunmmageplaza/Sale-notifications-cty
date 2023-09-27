import React, { useState } from "react";
import { ResourceItem, ResourceList, Stack } from "@shopify/polaris";
import NotificationsItem from "@assets/components/NotificationsItem";

// eslint-disable-next-line react/prop-types
function ResourceItems({data}) {
  const [selectedIds, setSelectedIds] = useState([]);

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
  const formatTimeAgo = timestampInMillis => {
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - timestampInMillis;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return days;
  };

  const formatDateTime = (timestampInSeconds, timestampInNanoseconds) => {
    const timestamp = timestampInSeconds + timestampInNanoseconds / 1e9;
    const dateObj = new Date(timestamp * 1000);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <ResourceList
      items={data}
      promotedBulkActions={promotedBulkActions}
      selectedItems={selectedIds}
      onSelectionChange={setSelectedIds}
      sortOptions={[
        {label: 'Newest update', value: '1'},
        {label: 'Oldest update', value: '2'}
      ]}
      renderItem={item => {
        const {id, timestamp} = item;
        const timestampInSeconds = timestamp._seconds;
        const timestampInNanoseconds = timestamp._nanoseconds;
        const timestampInMillis =
          timestampInSeconds * 1000 + Math.floor(timestampInNanoseconds / 1e6);
        const formattedTimestamp = formatTimeAgo(timestampInMillis);
        const timeStampFormatted = formatDateTime(timestampInSeconds, timestampInNanoseconds);

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
                <Stack.Item>{timeStampFormatted}</Stack.Item>
              </Stack>
            </ResourceItem>
          </div>
        );
      }}
    />
  );
}

export default ResourceItems;
