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
    return filterValues.some((v) =>
      dayjs(v as Date).isSame(
        dayjs(recordValue as Date),
        'day'
      )
    );
  }

  return filterValues.includes(recordValue);
};
