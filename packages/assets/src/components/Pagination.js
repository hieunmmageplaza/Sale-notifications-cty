import {Pagination} from '@shopify/polaris';
import React from 'react';

function PaginationExample() {
  return (
    <div className="pagination-example">
      <Pagination
        align="center"
        hasPrevious
        onPrevious={() => {
          console.log('Previous');
        }}
        hasNext
        onNext={() => {
          console.log('Next');
        }}
      />
    </div>
  );
}

export default PaginationExample;
