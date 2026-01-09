import React from 'react';
import { Form, Input } from 'antd';

import type { FormInstance } from 'antd';
import type { Record } from '@/shared/type';

interface RecordFormProps {
  form: FormInstance<Record>; // ⭐ Form 인스턴스 타입
}

export default function RecordForm({
  form,
}: RecordFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        name="name"
        label="이름"
        rules={[
          {
            required: true,
            message: '이름을 입력하세요',
          },
        ]}
      >
        <Input placeholder="이름 입력" />
      </Form.Item>
    </Form>
  );
}
