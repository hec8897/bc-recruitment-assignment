import { JOB_OPTIONS } from './common';
// ========== Constants ==========

export const FIELD_LABELS = {
  name: '이름',
  address: '주소',
  memo: '메모',
  joinDate: '가입일',
  job: '직업',
  emailAgree: '이메일 수신 동의',
} as const;

// ========== Types ==========

export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'select'
  | 'checkbox';
export type FieldID = keyof typeof FIELD_LABELS;
export type FieldLabel =
  (typeof FIELD_LABELS)[FieldID];

// ========== Interfaces ==========
export interface BaseFieldDefinition {
  id: FieldID;
  type: FieldType;
  label: FieldLabel;
  required: boolean;
  placeholder?: string;
}

export interface TextFiledDefinition extends BaseFieldDefinition {
  type: 'text' | 'textarea';
  maxLength: 20 | 50;
}

export interface SelectFieldDefinition extends BaseFieldDefinition {
  type: 'select';
  options: readonly { value: string }[];
}

export interface DateFieldDefinition extends BaseFieldDefinition {
  type: 'date';
}

export interface CheckboxFieldDefinition extends BaseFieldDefinition {
  type: 'checkbox';
}

export type FieldDefinition =
  | TextFiledDefinition
  | SelectFieldDefinition
  | DateFieldDefinition
  | CheckboxFieldDefinition;

// ========== Field Configurations ==========

export const FIELD_DEFINITIONS: FieldDefinition[] =
  [
    {
      id: 'name',
      type: 'text',
      label: FIELD_LABELS.name,
      required: true,
      maxLength: 20,
    },
    {
      id: 'address',
      type: 'text',
      label: FIELD_LABELS.address,
      required: false,
      maxLength: 20,
    },
    {
      id: 'memo',
      type: 'textarea',
      label: FIELD_LABELS.memo,
      required: false,
      maxLength: 50,
    },
    {
      id: 'joinDate',
      type: 'date',
      label: FIELD_LABELS.joinDate,
      required: true,
    },
    {
      id: 'job',
      type: 'select',
      label: FIELD_LABELS.job,
      required: false,
      options: JOB_OPTIONS,
    },
    {
      id: 'emailAgree',
      type: 'checkbox',
      label: FIELD_LABELS.emailAgree,
      required: false,
    },
  ];
