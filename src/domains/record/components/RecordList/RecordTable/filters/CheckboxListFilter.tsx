import React from 'react';
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
  }[];
}

export default function CheckboxListFilter({
  width,
  options,
}: CheckboxListFilterProps): React.ReactNode {
  return (
    <FilterDropdownWrapper
      style={{ width: width }}
    >
      <Flex vertical gap={8}>
        {options.map((option, index) => (
          <Flex gap={8} key={index}>
            <Checkbox />
            <span>{option.value}</span>
          </Flex>
        ))}
      </Flex>
    </FilterDropdownWrapper>
  );
}
