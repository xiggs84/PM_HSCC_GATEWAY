import dayjs from 'dayjs/esm';

import { IDanhMucTuVietTat, NewDanhMucTuVietTat } from './danh-muc-tu-viet-tat.model';

export const sampleWithRequiredData: IDanhMucTuVietTat = {
  id: 21203,
};

export const sampleWithPartialData: IDanhMucTuVietTat = {
  id: 7744,
  idVietTat: 26822,
  tuVietTat: 'out haggle',
  dienGiai: 'whoever throughout',
  idDonVi: 18772,
  trangThai: 27845,
};

export const sampleWithFullData: IDanhMucTuVietTat = {
  id: 12841,
  idVietTat: 24571,
  tuVietTat: 'forenenst yahoo cheery',
  dienGiai: 'abseil',
  idDonVi: 29060,
  nguoiThaoTac: 543,
  ngayThaoTac: dayjs('2024-07-16T16:32'),
  trangThai: 20078,
};

export const sampleWithNewData: NewDanhMucTuVietTat = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
