import React from 'react';

import RecordHead from './RecordHead';
import RecordTable from './RecordTable';

import styled from '@emotion/styled';

export default function RecordList() {
  return (
    <Container>
      <RecordHead />
      <RecordTable />
    </Container>
  );
}

const Container = styled.div`
  width: 1297px;
  margin: 0 auto;
`;
