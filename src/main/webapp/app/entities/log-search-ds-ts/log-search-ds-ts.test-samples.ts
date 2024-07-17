import dayjs from 'dayjs/esm';

import { ILogSearchDsTs, NewLogSearchDsTs } from './log-search-ds-ts.model';

export const sampleWithRequiredData: ILogSearchDsTs = {
  id: 25044,
};

export const sampleWithPartialData: ILogSearchDsTs = {
  id: 4000,
  idLog: 24439,
  noiDung: 'dependent artistic',
  slKq: 2781,
};

export const sampleWithFullData: ILogSearchDsTs = {
  id: 21480,
  idLog: 31305,
  nguoiThaoTac: 16053,
  ngayThaoTac: dayjs('2024-07-16'),
  noiDung: 'skimp photograph up',
  slKq: 7966,
  kqSearch: 'gah doc',
};

export const sampleWithNewData: NewLogSearchDsTs = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
