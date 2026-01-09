import React, { useMemo } from 'react';

import { Table } from 'antd';
import useTableColumns from './useTableColumns';

import { mockRecordData } from '@/domains/record/mock/recordData';

import styled from '@emotion/styled';
import type { TableProps } from 'antd';
import type { Record } from '@/shared/type';

interface RecordTableProps {
  onEditClick: (id: Pick<Record, 'id'>) => void;
}

export default function RecordTable({
  onEditClick,
}: RecordTableProps) {
  const columns = useTableColumns({
    onEditClick,
  });
  const rowSelection: TableProps<Record>['rowSelection'] =
    useMemo(
      () => ({
        onChange: (
          selectedRowKeys: React.Key[],
          selectedRows: Record[]
        ) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows:',
            selectedRows
          );
        },
      }),
      []
    );

  return (
    <TableWrapper>
      <Table<Record>
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={mockRecordData}
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
