import { IDanhMucHuyen, NewDanhMucHuyen } from './danh-muc-huyen.model';

export const sampleWithRequiredData: IDanhMucHuyen = {
  id: 27049,
};

export const sampleWithPartialData: IDanhMucHuyen = {
  id: 12530,
  tenHuyen: 'distinct who freak',
  trangThai: 18227,
};

export const sampleWithFullData: IDanhMucHuyen = {
  id: 27713,
  maHuyen: 31670,
  tenHuyen: 'under',
  trangThai: 11358,
};

export const sampleWithNewData: NewDanhMucHuyen = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
