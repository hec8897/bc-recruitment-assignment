import React, { useMemo } from 'react';

import { Form } from 'antd';
import styled from '@emotion/styled';

import renderField from './utils/renderField';
import getFiledRules from './utils/getFieldRules';

import {
  FIELD_DEFINITIONS,
  type Record,
} from '@/shared/type';

import type { FormInstance } from 'antd';

interface RecordFormProps {
  form: FormInstance<Record>;
}

export default function RecordForm({
  form,
}: RecordFormProps) {
  const fieldsWithRules = useMemo(() => {
    return FIELD_DEFINITIONS.map((field) => ({
      ...field,
      rules: getFiledRules({ field }),
    }));
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
    >
      <StyledForm>
        {fieldsWithRules.map((field) => (
          <Form.Item
            key={field.id}
            name={field.id}
            required={false}
            label={
              <LabelWrapper>
                {field.label}
                {field.required && (
                  <RequiredMark>*</RequiredMark>
                )}
              </LabelWrapper>
            }
            rules={field.rules}
            valuePropName={
              field.type === 'checkbox'
                ? 'checked'
                : 'value'
            }
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
    padding-bottom: 6px;
  }
`;

const RequiredMark = styled.span`
  color: #ff4d4f;
`;

const LabelWrapper = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #00000073;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
