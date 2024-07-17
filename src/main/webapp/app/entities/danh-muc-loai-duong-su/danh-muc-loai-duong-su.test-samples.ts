import { IDanhMucLoaiDuongSu, NewDanhMucLoaiDuongSu } from './danh-muc-loai-duong-su.model';

export const sampleWithRequiredData: IDanhMucLoaiDuongSu = {
  id: 5387,
};

export const sampleWithPartialData: IDanhMucLoaiDuongSu = {
  id: 29370,
  idLoaiDs: 27013,
  dienGiai: 'waterfall ick',
};

export const sampleWithFullData: IDanhMucLoaiDuongSu = {
  id: 24274,
  idLoaiDs: 9386,
  dienGiai: 'underneath although abaft',
  trangThai: 31730,
  strSearch: 'recognize bashfully inquisitively',
};

export const sampleWithNewData: NewDanhMucLoaiDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
