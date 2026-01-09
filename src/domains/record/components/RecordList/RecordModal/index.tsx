import React, { useEffect } from 'react';

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
  const getRecordById = useRecordStore(
    (state) => state.getRecordById
  );
  const addRecord = useRecordStore(
    (state) => state.addRecord
  );
  const updateRecord = useRecordStore(
    (state) => state.updateRecord
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
      targetId?.id &&
        updateRecord(targetId?.id, recordData);
    }

    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (mode === 'edit' && targetId?.id) {
      const record = getRecordById(targetId.id);
      if (record) {
        form.setFieldsValue({
          ...record,
          joinDate: dayjs(record.joinDate),
        });
      }
    } else {
      form.resetFields();
    }
  }, [mode, targetId, getRecordById, form]);

  return (
    <ModalWrapper>
      <Modal
        title={
          <Title>
            {mode === 'create'
              ? '회원 추가'
              : '회원 수정'}
          </Title>
        }
        open={isOpen}
        onCancel={onCancel}
        style={{
          padding: 16,
        }}
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
                backgroundColor: '#4A7CFE',
                borderColor: '#4A7CFE',
                color: '#fff',
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
        <div
          style={{
            padding: '10px 0',
          }}
        >
          <RecordForm form={form} />
        </div>
      </Modal>
    </ModalWrapper>
  );
}

const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
`;

const ModalWrapper = styled.div`
  > .ant-modal-container {
    padding: 16px;
  }
`;
