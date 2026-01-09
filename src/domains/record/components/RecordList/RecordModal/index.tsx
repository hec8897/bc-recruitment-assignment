import React from 'react';
import { Modal, Button } from 'antd';
import styled from '@emotion/styled';

export default function RecordModal() {
  return (
    <Modal
      title={<Title>회원 추가</Title>}
      open={true}
      onCancel={() => {}}
      footer={
        <>
          <Button
            style={{
              width: 57,
            }}
          >
            취소
          </Button>
          <Button
            style={{
              width: 57,
            }}
            type="primary"
          >
            추가
          </Button>
        </>
      }
    >
      <div>body</div>
    </Modal>
  );
}

const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
`;
