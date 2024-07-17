import { IDanhMucLoaiGiayTo, NewDanhMucLoaiGiayTo } from './danh-muc-loai-giay-to.model';

export const sampleWithRequiredData: IDanhMucLoaiGiayTo = {
  id: 10856,
};

export const sampleWithPartialData: IDanhMucLoaiGiayTo = {
  id: 2698,
};

export const sampleWithFullData: IDanhMucLoaiGiayTo = {
  id: 17491,
  idLoaiGiayTo: 20434,
  dienGiai: 'following',
};

export const sampleWithNewData: NewDanhMucLoaiGiayTo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
