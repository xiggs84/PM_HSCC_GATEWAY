import { IDanhMucXa, NewDanhMucXa } from './danh-muc-xa.model';

export const sampleWithRequiredData: IDanhMucXa = {
  id: 8969,
};

export const sampleWithPartialData: IDanhMucXa = {
  id: 25108,
  maXa: 23160,
  trangThai: 6474,
};

export const sampleWithFullData: IDanhMucXa = {
  id: 30267,
  maXa: 22735,
  tenXa: 'dreamily primary an',
  trangThai: 29719,
};

export const sampleWithNewData: NewDanhMucXa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
