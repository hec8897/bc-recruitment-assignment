import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import type {
  FieldID,
  Record,
} from '@/shared/type';
import dayjs from 'dayjs';

type FilterState = {
  [K in FieldID]: Record[K][];
};
interface RecordState {
  records: Record[];
  filters: FilterState;
  getUniqueValues: (
    field: FieldID
  ) => (string | boolean | Date)[];
  setFilter: (
    field: FieldID,
    values: Record[FieldID][]
  ) => void;
  getFilteredRecords: () => Record[];
  addRecord: (record: Omit<Record, 'id'>) => void;
  getRecordById: (
    id: string
  ) => Record | undefined;
  deleteRecord: (id: string) => void;
  updateRecord: (
    id: string,
    updatedData: Omit<Record, 'id'>
  ) => void;
}

const isMatchFilter = (
  field: FieldID,
  recordValue: any,
  filterValues: any[]
): boolean => {
  if (filterValues.length === 0) return true;

  if (field === 'joinDate') {
    return filterValues.some((fv) =>
      dayjs(fv).isSame(dayjs(recordValue), 'day')
    );
  }

  return filterValues.includes(recordValue);
};

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
        new Set(records.map((r) => r[field]))
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
          return isMatchFilter(
            field,
            record[field],
            filters[field]
          );
        });
      });
    },
    addRecord: (
      newRecord: Omit<Record, 'id'>
    ) => {
      const id = uuidv4();

      set((state) => ({
        records: [
          ...state.records,
          { ...newRecord, id },
        ],
      }));
    },
    getRecordById: (id: string) => {
      const { records } = get();
      return records.find(
        (record) => record.id === id
      );
    },
    updateRecord: (
      id: string,
      updatedData: Omit<Record, 'id'>
    ) => {
      set((state) => ({
        records: state.records.map((record) =>
          record.id === id
            ? { ...record, ...updatedData }
            : record
        ),
      }));
    },
    deleteRecord: (id: string) => {
      set((state) => ({
        records: state.records.filter(
          (record) => record.id !== id
        ),
      }));
    },
  })
);
