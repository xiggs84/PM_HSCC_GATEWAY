import { IDanhMucTinhTrangHonNhan, NewDanhMucTinhTrangHonNhan } from './danh-muc-tinh-trang-hon-nhan.model';

export const sampleWithRequiredData: IDanhMucTinhTrangHonNhan = {
  id: 4718,
};

export const sampleWithPartialData: IDanhMucTinhTrangHonNhan = {
  id: 5130,
  dienGiai: 'apud',
  trangThai: 12429,
};

export const sampleWithFullData: IDanhMucTinhTrangHonNhan = {
  id: 14315,
  idTinhTrang: 15674,
  dienGiai: 'pfft whose',
  trangThai: 20903,
};

export const sampleWithNewData: NewDanhMucTinhTrangHonNhan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
