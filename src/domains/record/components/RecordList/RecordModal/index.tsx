import React from 'react';
import { Modal, Button } from 'antd';
import styled from '@emotion/styled';

interface RecordModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function RecordModal({
  isOpen,
  onCancel,
}: RecordModalProps) {
  return (
    <Modal
      title={<Title>회원 추가</Title>}
      open={isOpen}
      onCancel={() => {}}
      footer={
        <>
          <Button
            style={{
              width: 57,
            }}
            onClick={onCancel}
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
