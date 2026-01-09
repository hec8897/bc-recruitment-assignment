import React, { useMemo } from 'react';

import { Checkbox } from 'antd';
import CheckboxListFilter from './filters/CheckboxListFilter';
import RecordActionDropdown from './actions/RecordActionDropdown';

import type { TableColumnsType } from 'antd';
import type { Record } from '@/shared/type';

export default function useTableColumns(): TableColumnsType<Record> {
  return useMemo(() => {
    return [
      {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
        width: 120,
        filterDropdown: () => (
          <CheckboxListFilter
            width={120}
            options={[{ value: 'foobar' }]}
          />
        ),
      },
      {
        title: '주소',
        dataIndex: 'address',
        key: 'address',
        width: 249,
        filterDropdown: () => (
          <CheckboxListFilter
            width={249}
            options={[{ value: '주소' }]}
          />
        ),
      },
      {
        title: '메모',
        dataIndex: 'memo',
        key: 'memo',
        width: 249,
        filterDropdown: () => (
          <CheckboxListFilter
            width={249}
            options={[{ value: '메모' }]}
          />
        ),
      },
      {
        title: '가입일',
        dataIndex: 'joinDate',
        key: 'joinDate',
        width: 200,
        filterDropdown: () => (
          <CheckboxListFilter
            width={200}
            options={[{ value: '가입일' }]}
          />
        ),
      },
      {
        title: '직업',
        dataIndex: 'job',
        key: 'job',
        width: 249,
        filterDropdown: () => (
          <CheckboxListFilter
            width={249}
            options={[{ value: '직업' }]}
          />
        ),
      },
      {
        title: '이메일 수신 동의',
        dataIndex: 'emailAgree',
        key: 'emailAgree',
        width: 150,
        filterDropdown: () => (
          <CheckboxListFilter
            width={150}
            options={[
              { value: '선택됨' },
              { value: '선택 안함' },
            ]}
          />
        ),

        render: (agree: boolean) => (
          <Checkbox checked={agree} />
        ),
      },
      {
        title: '',
        key: 'action',
        width: 60,
        align: 'center',
        render: (record: Record) => (
          <RecordActionDropdown
            id={{ id: record.id }}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ),
      },
    ];
  }, []);
}
