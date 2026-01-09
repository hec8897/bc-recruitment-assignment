import React from 'react';
import { Form, Input } from 'antd';

import type { FormInstance } from 'antd';
import {
  FIELD_DEFINITIONS,
  type FieldDefinition,
  type Record,
} from '@/shared/type';

interface RecordFormProps {
  form: FormInstance<Record>; // ⭐ Form 인스턴스 타입
}

const renderField = (field: FieldDefinition) => {
  switch (field.type) {
    case 'text':
      return (
        <Input
          autoComplete="off"
          placeholder={field.placeholder}
          maxLength={(field as any).maxLength} // 타입 가드 필요 (추후 개선)
        />
      );
    default:
      return <Input />;
  }
};

export default function RecordForm({
  form,
}: RecordFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
    >
      {FIELD_DEFINITIONS.map((field) => (
        <Form.Item
          key={field.id}
          name={field.id}
          label={field.label}
          rules={[
            {
              required: field.required,
              message: `${field.label}을(를) 입력하세요`,
            },
          ]}
        >
          {renderField(field)}
        </Form.Item>
      ))}
    </Form>
  );
}
