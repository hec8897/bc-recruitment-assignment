import React from 'react';
import {
  Checkbox,
  DatePicker,
  Input,
  Select,
} from 'antd';

import type { FieldDefinition } from '@/shared/type';

export default function renderField(
  field: FieldDefinition
) {
  switch (field.type) {
    case 'text':
      return (
        <Input placeholder={field.placeholder} />
      );
    case 'textarea':
      return (
        <Input.TextArea
          placeholder={field.placeholder}
          rows={4}
        />
      );
    case 'date':
      return (
        <DatePicker
          style={{ width: '160px' }}
          format="YYYY-MM-DD"
        />
      );
    case 'select':
      return (
        <Select
          placeholder={
            field.placeholder || '선택하세요'
          }
          options={
            field.options as { value: string }[]
          }
        />
      );
    case 'checkbox':
      return <Checkbox />;

    default:
      return <Input />;
  }
}
