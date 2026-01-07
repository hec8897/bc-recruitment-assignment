export type Job =
  | ''
  | '개발자'
  | 'PO'
  | '디자이너';

export const JOB_OPTIONS: readonly {
  value: Job;
}[] = [
  { value: '' },
  { value: '개발자' },
  { value: 'PO' },
  { value: '디자이너' },
];
