import { ITinhTrangDuongSu, NewTinhTrangDuongSu } from './tinh-trang-duong-su.model';

export const sampleWithRequiredData: ITinhTrangDuongSu = {
  id: 9994,
};

export const sampleWithPartialData: ITinhTrangDuongSu = {
  id: 4765,
  dienGiai: 'greatly',
  idLoaiDs: 14678,
};

export const sampleWithFullData: ITinhTrangDuongSu = {
  id: 7551,
  idTinhTrang: 7862,
  dienGiai: 'budget',
  idLoaiDs: 23139,
};

export const sampleWithNewData: NewTinhTrangDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
