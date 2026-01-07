import React, { useMemo } from 'react';
import { Checkbox, Flex } from 'antd';

import styled from '@emotion/styled';

import type { TableColumnsType } from 'antd';
import type { Record } from '@/shared/type';

const FilterDropdown = styled.div`
  width: 120px;
  padding: 8px;
`;

export default function useTableColums(): TableColumnsType<Record> {
  return useMemo(() => {
    return [
      {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
        width: 120,
        filterDropdown: (
          <FilterDropdown>
            <Flex gap={8}>
              <Checkbox />
              <span>foo bar</span>
            </Flex>
            <Flex gap={8}>
              <Checkbox />
              <span>foo bar</span>
            </Flex>
          </FilterDropdown>
        ),
      },
      {
        title: '주소',
        dataIndex: 'address',
        key: 'address',
        width: 249,
        filterDropdown: (
          <FilterDropdown
            style={{
              width: 249,
            }}
          >
            주소 필터
          </FilterDropdown>
        ),
      },
      {
        title: '메모',
        dataIndex: 'memo',
        key: 'memo',
        width: 249,
        filterDropdown: (
          <FilterDropdown style={{ width: 249 }}>
            메모 필터
          </FilterDropdown>
        ),
      },
      {
        title: '가입일',
        dataIndex: 'joinDate',
        key: 'joinDate',
        width: 200,
        filterDropdown: (
          <FilterDropdown style={{ width: 200 }}>
            가입일 필터
          </FilterDropdown>
        ),
      },
      {
        title: '직업',
        dataIndex: 'job',
        key: 'job',
        width: 249,
        filterDropdown: (
          <FilterDropdown style={{ width: 249 }}>
            직업 필터
          </FilterDropdown>
        ),
      },
      {
        title: '이메일 수신 동의',
        dataIndex: 'emailAgree',
        key: 'emailAgree',
        width: 150,
        filterDropdown: (
          <FilterDropdown style={{ width: 150 }}>
            이메일 수신 동의 필터
          </FilterDropdown>
        ),

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
  }, []);
}
