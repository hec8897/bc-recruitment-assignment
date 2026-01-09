import React from 'react';
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
} from 'antd';
import styled from '@emotion/styled';

import {
  FIELD_DEFINITIONS,
  type FieldDefinition,
  type Record,
} from '@/shared/type';
import type { FormInstance } from 'antd';

interface RecordFormProps {
  form: FormInstance<Record>; // ⭐ Form 인스턴스 타입
}

const renderField = (field: FieldDefinition) => {
  switch (field.type) {
    case 'text':
      return (
        <Input
          placeholder={field.placeholder}
          maxLength={(field as any).maxLength} // 타입 가드 필요 (추후 개선)
        />
      );
    case 'textarea':
      return (
        <Input.TextArea
          placeholder={field.placeholder}
          maxLength={field.maxLength || 0}
          rows={4} // 높이 조절
        />
      );
    case 'date':
      return (
        <DatePicker
          style={{ width: '160px' }}
          // placeholder="날짜를 선택하세요"
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
      <StyledForm>
        {FIELD_DEFINITIONS.map((field) => (
          <Form.Item
            required={false} // ⭐ 기본 * 표시 제거
            key={field.id}
            name={field.id}
            label={
              <LabelWrapper>
                {field.label}
                {field.required && (
                  <RequiredMark>*</RequiredMark>
                )}
              </LabelWrapper>
            }
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
      </StyledForm>
    </Form>
  );
}

const StyledForm = styled.div`
  .ant-form-item-label {
    padding-bottom: 6px; /* 기본값 8px → 4px로 줄임 */
  }
`;

// ⭐ Emotion으로 스타일링
const RequiredMark = styled.span`
  color: #ff4d4f;
`;

// 또는 좀 더 디테일하게
const LabelWrapper = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #00000073;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
