import type { Record } from '@/shared/type';

export const mockRecordData: Record[] = [
  {
    id: '1',
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    joinDate: new Date('2024-10-02'),
    job: '개발자',
    emailAgree: true,
  },
  {
    id: '2',
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    joinDate: new Date('2024-10-01'),
    job: 'PO',
    emailAgree: false,
  },
];
