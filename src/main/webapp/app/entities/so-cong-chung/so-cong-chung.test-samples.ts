import dayjs from 'dayjs/esm';

import { ISoCongChung, NewSoCongChung } from './so-cong-chung.model';

export const sampleWithRequiredData: ISoCongChung = {
  id: 25242,
};

export const sampleWithPartialData: ISoCongChung = {
  id: 14805,
  idSo: 20207,
  giaTri: 24352,
  nguoiThaoTac: 12580,
  idLoaiSo: 31916,
};

export const sampleWithFullData: ISoCongChung = {
  id: 21322,
  ngayThaoTac: dayjs('2024-07-16'),
  idSo: 22623,
  idDonVi: 22306,
  tenSo: 'behind as discussion',
  giaTri: 20839,
  nguoiThaoTac: 23313,
  trangThai: 29727,
  idLoaiSo: 9882,
};

export const sampleWithNewData: NewSoCongChung = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
