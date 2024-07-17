import { IDanhMucDichVu, NewDanhMucDichVu } from './danh-muc-dich-vu.model';

export const sampleWithRequiredData: IDanhMucDichVu = {
  id: 4779,
};

export const sampleWithPartialData: IDanhMucDichVu = {
  id: 21935,
  idDichVu: 15990,
};

export const sampleWithFullData: IDanhMucDichVu = {
  id: 1751,
  dienGiai: 'sharp subtitle ick',
  donViTinh: 'impressionable',
  donGia: 29235,
  idDichVu: 6866,
};

export const sampleWithNewData: NewDanhMucDichVu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
