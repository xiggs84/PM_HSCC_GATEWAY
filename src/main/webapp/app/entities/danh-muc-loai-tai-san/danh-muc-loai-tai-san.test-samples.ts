import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from './danh-muc-loai-tai-san.model';

export const sampleWithRequiredData: IDanhMucLoaiTaiSan = {
  id: 11442,
};

export const sampleWithPartialData: IDanhMucLoaiTaiSan = {
  id: 20658,
  idLoaiTs: 23778,
  dienGiai: 'valuable whereas ew',
  trangThai: 3150,
};

export const sampleWithFullData: IDanhMucLoaiTaiSan = {
  id: 13727,
  idLoaiTs: 23606,
  dienGiai: 'aha',
  trangThai: 2456,
  searchStr: 'balcony',
};

export const sampleWithNewData: NewDanhMucLoaiTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
