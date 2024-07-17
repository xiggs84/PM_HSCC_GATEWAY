import { IDanhMucLoaiVanBan, NewDanhMucLoaiVanBan } from './danh-muc-loai-van-ban.model';

export const sampleWithRequiredData: IDanhMucLoaiVanBan = {
  id: 32374,
};

export const sampleWithPartialData: IDanhMucLoaiVanBan = {
  id: 8548,
  idLoaiVb: 6344,
  dienGiai: 'spar',
};

export const sampleWithFullData: IDanhMucLoaiVanBan = {
  id: 2047,
  idLoaiVb: 7055,
  dienGiai: 'unethically potentially past',
  idLoaiHopDong: 12693,
};

export const sampleWithNewData: NewDanhMucLoaiVanBan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
