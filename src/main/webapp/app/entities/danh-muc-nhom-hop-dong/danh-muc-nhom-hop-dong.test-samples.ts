import { IDanhMucNhomHopDong, NewDanhMucNhomHopDong } from './danh-muc-nhom-hop-dong.model';

export const sampleWithRequiredData: IDanhMucNhomHopDong = {
  id: 13465,
};

export const sampleWithPartialData: IDanhMucNhomHopDong = {
  id: 21119,
};

export const sampleWithFullData: IDanhMucNhomHopDong = {
  id: 14950,
  idNhom: 6928,
  dienGiai: 'meanwhile',
};

export const sampleWithNewData: NewDanhMucNhomHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
