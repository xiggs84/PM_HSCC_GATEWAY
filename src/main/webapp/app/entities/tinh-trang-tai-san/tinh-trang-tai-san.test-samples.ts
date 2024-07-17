import { ITinhTrangTaiSan, NewTinhTrangTaiSan } from './tinh-trang-tai-san.model';

export const sampleWithRequiredData: ITinhTrangTaiSan = {
  id: 20432,
};

export const sampleWithPartialData: ITinhTrangTaiSan = {
  id: 1776,
  idTinhTrang: 14260,
};

export const sampleWithFullData: ITinhTrangTaiSan = {
  id: 30739,
  idTinhTrang: 30623,
  dienGiai: 'gracefully immediate',
  trangThai: 23821,
};

export const sampleWithNewData: NewTinhTrangTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
