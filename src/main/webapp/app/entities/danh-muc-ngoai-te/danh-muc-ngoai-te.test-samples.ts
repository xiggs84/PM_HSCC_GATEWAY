import { IDanhMucNgoaiTe, NewDanhMucNgoaiTe } from './danh-muc-ngoai-te.model';

export const sampleWithRequiredData: IDanhMucNgoaiTe = {
  id: 17305,
};

export const sampleWithPartialData: IDanhMucNgoaiTe = {
  id: 23312,
  idLoai: 20643,
  dienGiai: 'knavishly what',
};

export const sampleWithFullData: IDanhMucNgoaiTe = {
  id: 29566,
  idLoai: 4645,
  dienGiai: 'anchored',
};

export const sampleWithNewData: NewDanhMucNgoaiTe = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
