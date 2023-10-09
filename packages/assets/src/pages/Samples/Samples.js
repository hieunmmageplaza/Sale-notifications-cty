import React from 'react';
import {Card, IndexTable, Layout, Page, TextStyle, useIndexResourceState} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Samples() {
  const {data} = useFetchApi({url: '/samples'});
  if (data.orders) {
    console.log(data.orders);
  }
  return (
    <Page title="Samples" breadcrumbs={[{url: '/'}]}>
      <Layout>
        <Layout.Section>
          <Card>a</Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
