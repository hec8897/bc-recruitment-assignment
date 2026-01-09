import type { Rule } from 'antd/es/form';
import type { FieldDefinition } from '@/shared/type';

interface GetFieldRulesProps {
  field: FieldDefinition;
}

export default function getFieldRules({
  field,
}: GetFieldRulesProps): Rule[] {
  const rules: Rule[] = [];

  if (field.required) {
    rules.push({
      required: true,
      message: `${field.label}은 필수값입니다.`,
    });
  }

  if (
    field.type === 'text' ||
    field.type === 'textarea'
  ) {
    rules.push({
      max: field.maxLength,
      message: `글자수 ${field.maxLength}을 초과할 수 없습니다.`,
    });
  }

  return rules;
}
