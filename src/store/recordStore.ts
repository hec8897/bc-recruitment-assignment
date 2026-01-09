import {
  create,
  type StateCreator,
} from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import {
  persist,
  createJSONStorage,
} from 'zustand/middleware';

import type {
  FieldID,
  Record,
} from '@/shared/type';

import { isMatchFilter } from './recordStore.util';
import { mockRecords } from './mock';

import type { RecordState } from './recordStore.type';

const storageType =
  import.meta.env.VITE_STORAGE || 'in-memory';

const createRecordStore: StateCreator<
  RecordState
> = (set, get) => ({
  records: mockRecords,
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
        records
          .map((r) => r[field])
          .filter(
            (value) =>
              value !== '' && value != null
          )
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
        return isMatchFilter(
          field,
          record[field],
          filters[field]
        );
      });
    });
  },
  addRecord: (newRecord: Omit<Record, 'id'>) => {
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
});

export const useRecordStore =
  storageType === 'local-storage'
    ? create<RecordState>()(
        persist(createRecordStore, {
          name: 'record-storage',
          storage: createJSONStorage(
            () => localStorage
          ),
        })
      )
    : create<RecordState>()(createRecordStore);
