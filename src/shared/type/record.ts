import type { Job } from './common';

export interface Record {
  id: string;
  name: string;
  address: string;
  memo: string;
  joinDate: Date;
  job: Job;
  emailAgree: boolean;
}
