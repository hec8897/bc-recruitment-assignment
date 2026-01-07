import React from 'react';
import { Table } from 'antd';
import type {
  TableColumnsType,
  TableProps,
} from 'antd';

import { mockRecordData } from '@/domains/record/mock/recordData';
import type { Record } from '@/shared/type';

const columns: TableColumnsType<Record> = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '주소',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '메모',
    dataIndex: 'memo',
    key: 'memo',
  },
  {
    title: '직업',
    dataIndex: 'job',
    key: 'job',
  },
  {
    title: '이메일 수신 동의',
    dataIndex: 'emailAgree',
    key: 'emailAgree',
  },
];

const rowSelection: TableProps<Record>['rowSelection'] =
  {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: Record[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record: Record) => ({
      name: record.name,
    }),
  };

export default function RecordTable() {
  return (
    <div>
      <Table<Record>
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={mockRecordData}
      />
    </div>
  );
}
