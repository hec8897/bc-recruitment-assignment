import React from 'react';
import { Checkbox } from 'antd';

import type { TableColumnsType } from 'antd';
import type { Record } from '@/shared/type';

export const columns: TableColumnsType<Record> = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '주소',
    dataIndex: 'address',
    key: 'address',
    width: 249,
  },
  {
    title: '메모',
    dataIndex: 'memo',
    key: 'memo',
    width: 249,
  },
  {
    title: '가입일',
    dataIndex: 'joinDate',
    key: 'joinDate',
    width: 200,
  },
  {
    title: '직업',
    dataIndex: 'job',
    key: 'job',
    width: 249,
  },
  {
    title: '이메일 수신 동의',
    dataIndex: 'emailAgree',
    key: 'emailAgree',
    width: 150,
    render: (agree: boolean) => (
      <Checkbox checked={agree} />
    ),
  },
  {
    title: '',
    dataIndex: '',
    key: '',
  },
];
