import { IDanhMucTinh, NewDanhMucTinh } from './danh-muc-tinh.model';

export const sampleWithRequiredData: IDanhMucTinh = {
  id: 28010,
};

export const sampleWithPartialData: IDanhMucTinh = {
  id: 19404,
  maTinh: 14989,
  tenTinh: 'courageously duh when',
  trangThai: 3402,
};

export const sampleWithFullData: IDanhMucTinh = {
  id: 20630,
  maTinh: 3167,
  tenTinh: 'anenst for hopelessly',
  trangThai: 29857,
};

export const sampleWithNewData: NewDanhMucTinh = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
