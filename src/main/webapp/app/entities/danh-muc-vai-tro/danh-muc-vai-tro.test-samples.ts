import { IDanhMucVaiTro, NewDanhMucVaiTro } from './danh-muc-vai-tro.model';

export const sampleWithRequiredData: IDanhMucVaiTro = {
  id: 21418,
};

export const sampleWithPartialData: IDanhMucVaiTro = {
  id: 23497,
  idLoaiVaiTro: 11454,
};

export const sampleWithFullData: IDanhMucVaiTro = {
  id: 14109,
  idVaiTro: 26651,
  dienGiai: 'cartilage less',
  idLoaiHopDong: 14196,
  idLoaiVaiTro: 11778,
};

export const sampleWithNewData: NewDanhMucVaiTro = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
