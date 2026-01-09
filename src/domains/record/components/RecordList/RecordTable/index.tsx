import React from 'react';

import { Table } from 'antd';
import useTableColumns from './useTableColumns';

import { useRecordStore } from '@/store/recordStore';
import styled from '@emotion/styled';

import type { Record } from '@/shared/type';

interface RecordTableProps {
  onEditClick: (id: Pick<Record, 'id'>) => void;
}

export default function RecordTable({
  onEditClick,
}: RecordTableProps) {
  const getFilteredRecords = useRecordStore(
    (state) => state.getFilteredRecords
  );
  const records = getFilteredRecords();

  const columns = useTableColumns({
    onEditClick,
  });

  return (
    <TableWrapper>
      <Table<Record>
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
        }}
        columns={columns}
        dataSource={records}
        pagination={false}
      />
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  border-top: 1px solid #0000000f;

  .ant-table {
    font-size: 14px;
  }

  .ant-table-thead > tr > th {
    height: 38px;
    padding: 8px 12px;
  }

  .ant-table-tbody > tr > td {
    height: 48px;
    padding: 8px 12px;
  }

  // 체크박스 border
  .ant-table-tbody .ant-table-selection-column {
    border-right: 1px solid #0000000f;
  }
`;
