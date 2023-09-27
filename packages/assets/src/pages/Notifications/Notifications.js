import React from 'react';
import {Card, Layout, Page} from '@shopify/polaris';
import ResourceItems from '@assets/ResourceItems';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import '../../App.css';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {data: notifications} = useFetchApi({url: '/notifications'});
  return (
    <Page
      title="Notifications"
      subtitle="List of sales notification from Shopify"
      breadcrumbs={[{url: '/'}]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <ResourceItems data={notifications} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
