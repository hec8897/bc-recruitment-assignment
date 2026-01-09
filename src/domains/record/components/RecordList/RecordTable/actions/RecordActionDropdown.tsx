// RecordTable/actions/RecordActionDropdown.tsx
import React from 'react';
import { Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { useRecordStore } from '@/store/recordStore';

interface RecordActionDropdownProps {
  id: string;
  onEdit: (id: string) => void;
}

export default function RecordActionDropdown({
  id,
  onEdit,
}: RecordActionDropdownProps) {
  const deleteRecord = useRecordStore(
    (state) => state.deleteRecord
  );

  const menuItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: '수정',
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: '삭제',
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({
    key,
  }) => {
    if (key === 'edit') {
      onEdit?.(id);
    } else if (key === 'delete') {
      deleteRecord(id);
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        style: {
          width: 180,
        },
        items: menuItems,
        onClick: handleMenuClick,
      }}
    >
      <Button
        type="text"
        icon={<MoreOutlined />}
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );
}
