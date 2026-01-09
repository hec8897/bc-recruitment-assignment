import dayjs from 'dayjs';
import type {
  FieldID,
  Record,
} from '@/shared/type';

export const isMatchFilter = (
  field: FieldID,
  recordValue: Record[FieldID],
  filterValues: Record[FieldID][]
): boolean => {
  if (filterValues.length === 0) return true;

  if (field === 'joinDate') {
    const recordDateStr = dayjs(
      recordValue as Date
    ).format('YYYY-MM-DD');
    return filterValues.some(
      (v) => v === recordDateStr
    );
  }

  return filterValues.includes(recordValue);
};
