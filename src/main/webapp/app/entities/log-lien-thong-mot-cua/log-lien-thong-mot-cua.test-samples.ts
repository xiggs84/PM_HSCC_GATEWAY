import dayjs from 'dayjs/esm';

import { ILogLienThongMotCua, NewLogLienThongMotCua } from './log-lien-thong-mot-cua.model';

export const sampleWithRequiredData: ILogLienThongMotCua = {
  id: 38,
};

export const sampleWithPartialData: ILogLienThongMotCua = {
  id: 24730,
  idChungThuc: 22040,
  nguoiThaoTac: 20995,
};

export const sampleWithFullData: ILogLienThongMotCua = {
  id: 16622,
  idLog: 8810,
  idChungThuc: 1518,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 9810,
  noiDung: 'well-lit until',
};

export const sampleWithNewData: NewLogLienThongMotCua = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
