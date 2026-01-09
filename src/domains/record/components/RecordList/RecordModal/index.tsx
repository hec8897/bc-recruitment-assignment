import React from 'react';

import { Modal, Button, Form } from 'antd';
import RecordForm from './RecordForm';

import styled from '@emotion/styled';
import type { Record } from '@/shared/type';

interface RecordModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function RecordModal({
  isOpen,
  onCancel,
}: RecordModalProps) {
  const [form] = Form.useForm<Record>();

  const onHandleSubmit = () => {
    const values = form.getFieldsValue(); // ⭐ 모든 필드 값 가져오기
    console.log('현재 Form 값:', values);

    form.submit();
  };

  return (
    <Modal
      title={<Title>회원 추가</Title>}
      open={isOpen}
      onCancel={onCancel}
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
            onClick={onHandleSubmit}
          >
            추가
          </Button>
        </>
      }
    >
      <RecordForm form={form} />
    </Modal>
  );
}

const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
`;
