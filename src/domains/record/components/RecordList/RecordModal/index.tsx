import React from 'react';

import { Modal, Button, Form } from 'antd';
import RecordForm from './RecordForm';

import styled from '@emotion/styled';
import type { Record } from '@/shared/type';
import useFormValidation from './useFormValidation';
import type { ModalMode } from '@/domains/record/hooks/useRecordModal';
import dayjs from 'dayjs';
import { useRecordStore } from '@/store/recordStore';

interface RecordModalProps {
  isOpen: boolean;
  onCancel: () => void;
  mode: ModalMode;
  targetId: Pick<Record, 'id'> | null;
}

export default function RecordModal({
  isOpen,
  onCancel,
  mode,
  targetId,
}: RecordModalProps) {
  const [form] = Form.useForm<Record>();
  const { submittable } = useFormValidation(form);
  const addRecord = useRecordStore(
    (state) => state.addRecord
  );

  const onHandleSubmit = () => {
    const values = form.getFieldsValue();
    const recordData = {
      ...values,
      joinDate:
        values.joinDate instanceof Date
          ? values.joinDate
          : dayjs(values.joinDate).toDate(),
    };
    if (mode === 'create') {
      addRecord(recordData);
    } else {
      // 수정 로직
      console.log('수정 로직', targetId);
    }

    form.resetFields();
    onCancel();
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
            disabled={!submittable}
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
