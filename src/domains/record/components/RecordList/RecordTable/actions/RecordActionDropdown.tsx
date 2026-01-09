// RecordTable/actions/RecordActionDropdown.tsx
import React from 'react';
import { Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { Record } from '@/shared/type';

type ID = Pick<Record, 'id'>;
interface RecordActionDropdownProps {
  id: ID;
  onEdit: (id: ID) => void;
  onDelete: (id: ID) => void;
}

export default function RecordActionDropdown({
  id,
  onEdit,
  onDelete,
}: RecordActionDropdownProps) {
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
      console.log('수정:', id);
      onEdit?.(id);
    } else if (key === 'delete') {
      console.log('삭제:', id);
      onDelete?.(id);
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
