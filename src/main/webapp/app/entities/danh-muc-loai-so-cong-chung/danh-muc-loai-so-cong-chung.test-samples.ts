import { IDanhMucLoaiSoCongChung, NewDanhMucLoaiSoCongChung } from './danh-muc-loai-so-cong-chung.model';

export const sampleWithRequiredData: IDanhMucLoaiSoCongChung = {
  id: 1705,
};

export const sampleWithPartialData: IDanhMucLoaiSoCongChung = {
  id: 23068,
  idLoai: 19132,
  tenLoai: 'finally boohoo',
};

export const sampleWithFullData: IDanhMucLoaiSoCongChung = {
  id: 20425,
  idLoai: 26655,
  tenLoai: 'briskly',
  trangThai: 22128,
};

export const sampleWithNewData: NewDanhMucLoaiSoCongChung = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
