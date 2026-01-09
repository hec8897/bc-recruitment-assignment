import { useState } from 'react';

import type { Record } from '@/shared/type';

export type ModalMode = 'create' | 'edit';

/**
 * 모달 상태 관리 Hook
 * 회원 추가/수정 모달의 열기/닫기 상태와 모드를 관리
 *
 */

export default function useRecordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] =
    useState<ModalMode>('create');

  const [targetId, setTargetId] = useState<Pick<
    Record,
    'id'
  > | null>(null);

  /**
   * 회원 추가 모달 열기
   */

  const openCreateModal = () => {
    setMode('create');
    setIsOpen(true);
  };

  /**
   * 회원 수정 모달
   * 수정할 회원의 ID 를 전달받음
   */
  const openEditModal = (
    id: Pick<Record, 'id'>
  ) => {
    setTargetId(id);
    setMode('edit');
    setIsOpen(true);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setIsOpen(false);
    setTargetId(null);
  };

  return {
    targetId,
    mode,
    isOpen,
    openCreateModal,
    openEditModal,
    closeModal,
  };
}
