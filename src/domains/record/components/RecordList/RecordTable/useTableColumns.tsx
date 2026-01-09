import React, { useMemo } from 'react';

import { Checkbox } from 'antd';
import CheckboxListFilter from './filters/CheckboxListFilter';
import RecordActionDropdown from './actions/RecordActionDropdown';

import type { TableColumnsType } from 'antd';
import type {
  FieldID,
  Record,
} from '@/shared/type';
import { useRecordStore } from '@/store/recordStore';
import dayjs from 'dayjs';

interface UseTableColumnsProps {
  onEditClick: (id: Pick<Record, 'id'>) => void;
}

export default function useTableColumns({
  onEditClick,
}: UseTableColumnsProps): TableColumnsType<Record> {
  const { getUniqueValues, setFilter } =
    useRecordStore();

  const createFilterDropdown =
    (field: FieldID, width: number) => () => (
      <CheckboxListFilter
        width={width}
        options={getUniqueValues(field).map(
          (value) => ({
            value: value as string,
          })
        )}
        onChange={(value) =>
          setFilter(field, value)
        }
      />
    );

  return useMemo(() => {
    return [
      {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
        width: 120,
        filterDropdown: createFilterDropdown(
          'name',
          120
        ),
      },
      {
        title: '주소',
        dataIndex: 'address',
        key: 'address',
        width: 249,
        filterDropdown: createFilterDropdown(
          'address',
          249
        ),
      },
      {
        title: '메모',
        dataIndex: 'memo',
        key: 'memo',
        width: 249,
        filterDropdown: createFilterDropdown(
          'memo',
          249
        ),
      },
      {
        title: '가입일',
        dataIndex: 'joinDate',
        key: 'joinDate',
        width: 200,
        render: (date: Date) =>
          dayjs(date).format('YYYY-MM-DD'),
        filterDropdown: () => (
          <CheckboxListFilter
            width={200}
            onChange={(value) => {
              setFilter('joinDate', value);
            }}
            options={getUniqueValues(
              'joinDate'
            ).map((date) => ({
              value: dayjs(date as Date).format(
                'YYYY-MM-DD'
              ) as string,
            }))}
          />
        ),
      },
      {
        title: '직업',
        dataIndex: 'job',
        key: 'job',
        width: 249,
        filterDropdown: createFilterDropdown(
          'job',
          249
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
            onChange={(values) => {
              setFilter(
                'emailAgree',
                values as boolean[]
              );
            }}
            options={[
              { value: true, label: '선택됨' },
              {
                value: false,
                label: '선택 안함',
              },
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
            id={record.id}
            onEdit={(id) => onEditClick({ id })}
          />
        ),
      },
    ];
  }, [onEditClick, getUniqueValues, setFilter]);
}
