import React from 'react';

import styled from '@emotion/styled';

import { Button, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function RecordHead() {
  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        height: '48px',
        padding: '8px 14px',
      }}
    >
      <Title>회원 목록</Title>
      <Button
        style={{
          width: '73px',
        }}
        type="primary"
        icon={
          <PlusOutlined
            style={{ fontSize: '16px' }}
          />
        }
      >
        추가
      </Button>
    </Flex>
  );
}

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;
