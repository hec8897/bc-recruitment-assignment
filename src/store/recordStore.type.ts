import type {
  FieldID,
  Record,
} from '@/shared/type';

export type FilterState = {
  [K in FieldID]: Record[K][];
};

export interface RecordState {
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
