import { create } from 'zustand';

import type {
  FieldID,
  Record,
} from '@/shared/type';

type FilterState = {
  [K in FieldID]: Record[K][];
};
interface RecordState {
  records: Record[];
  filters: FilterState;
  getUniqueValues: (field: FieldID) => string[];
  setFilter: (
    field: FieldID,
    values: Record[FieldID][] // 배열
  ) => void;
  getFilteredRecords: () => Record[];
}

export const useRecordStore = create<RecordState>(
  (set, get) => ({
    records: [
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
    ],
    filters: {
      name: [],
      address: [],
      memo: [],
      joinDate: [],
      job: [],
      emailAgree: [],
    },
    getUniqueValues: (field: FieldID) => {
      const records = get().records;
      return Array.from(
        new Set(
          records.map((r) => r[field] as string)
        )
      );
    },
    setFilter: (
      field: FieldID,
      values: Record[FieldID][]
    ) => {
      set((state) => ({
        filters: {
          ...state.filters,
          [field]: values,
        },
      }));
    },
    getFilteredRecords: () => {
      const { records, filters } = get();
      return records.filter((record) => {
        return (
          Object.keys(filters) as FieldID[]
        ).every((field) => {
          const filterValues = filters[field];
          if (filterValues.length === 0)
            return true;

          return filterValues.some(
            (fv) => fv === record[field]
          );
        });
      });
    },
  })
);
