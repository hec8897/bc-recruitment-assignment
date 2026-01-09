import React, { useState } from 'react';
import { Checkbox, Flex } from 'antd';

import styled from '@emotion/styled';

const FilterDropdownWrapper = styled.div`
  width: 120px;
  padding: 8px;
`;

interface CheckboxListFilterProps {
  width?: number;
  options: {
    value: string | boolean;
    label?: string;
  }[];
  onChange?: (
    values: (string | boolean)[]
  ) => void;
}

export default function CheckboxListFilter({
  width,
  options,
  onChange,
}: CheckboxListFilterProps): React.ReactNode {
  const [selectedValues, setSelectedValues] =
    useState<(string | boolean)[]>([]);

  const handleChange = (
    value: string | boolean,
    checked: boolean
  ) => {
    const newValues = checked
      ? [...selectedValues, value] // 체크: 추가
      : selectedValues.filter((v) => v !== value); // 언체크: 제거

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  return (
    <FilterDropdownWrapper
      style={{ width: width }}
    >
      <Flex vertical gap={8}>
        {options.map((option, index) => (
          <Flex
            gap={8}
            key={`${option.value}-${index}`}
          >
            <Checkbox
              checked={selectedValues.includes(
                option.value
              )}
              onChange={(e) => {
                const checked = e.target.checked;
                handleChange(
                  option.value,
                  checked
                );
              }}
            />
            <span>
              {option.label || option.value}
            </span>
          </Flex>
        ))}
      </Flex>
    </FilterDropdownWrapper>
  );
}
