import React from 'react';

import RecordHead from './RecordHead';
import RecordTable from './RecordTable';

import styled from '@emotion/styled';
import RecordModal from './RecordModal';
import useRecordModal from '../../hooks/useRecordModal';

export default function RecordList() {
  const {
    openEditModal,
    closeModal,
    openCreateModal,
    isOpen,
  } = useRecordModal();
  return (
    <Container>
      <RecordHead onAddClick={openCreateModal} />
      <RecordTable onEditClick={openEditModal} />
      <RecordModal
        isOpen={isOpen}
        onCancel={closeModal}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 1297px;
  margin: 0 auto;
`;
