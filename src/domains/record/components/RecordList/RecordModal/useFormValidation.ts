import { useEffect, useState } from 'react';
import { Form } from 'antd';

import type { FormInstance } from 'antd';
import { type Record } from '@/shared/type';

export default function useFormValidation(
  form: FormInstance<Record>
) {
  const [submittable, setSubmittable] =
    useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return {
    submittable,
  };
}
