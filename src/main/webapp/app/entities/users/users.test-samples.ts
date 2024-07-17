import dayjs from 'dayjs/esm';

import { IUsers, NewUsers } from './users.model';

export const sampleWithRequiredData: IUsers = {
  id: 24820,
};

export const sampleWithPartialData: IUsers = {
  id: 21742,
  email: 'TrongHung31@hotmail.com',
  password: 'boohoo uh-huh since',
  createdAt: dayjs('2024-07-16T23:56'),
  updatedAt: dayjs('2024-07-17T01:20'),
  idDonVi: 9933,
};

export const sampleWithFullData: IUsers = {
  id: 1356,
  name: 'eek squabble',
  email: 'DanhSon98@hotmail.com',
  password: 'orientate atomize yippee',
  rememberToken: 'hmph',
  createdAt: dayjs('2024-07-16T05:07'),
  updatedAt: dayjs('2024-07-16T06:53'),
  idDonVi: 18136,
};

export const sampleWithNewData: NewUsers = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
