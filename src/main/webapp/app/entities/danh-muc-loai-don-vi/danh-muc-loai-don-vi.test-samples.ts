import { IDanhMucLoaiDonVi, NewDanhMucLoaiDonVi } from './danh-muc-loai-don-vi.model';

export const sampleWithRequiredData: IDanhMucLoaiDonVi = {
  id: 12012,
};

export const sampleWithPartialData: IDanhMucLoaiDonVi = {
  id: 5338,
  dienGiai: 'guilt relate canst',
};

export const sampleWithFullData: IDanhMucLoaiDonVi = {
  id: 6374,
  idLoaiDv: 12989,
  dienGiai: 'openly usefully',
};

export const sampleWithNewData: NewDanhMucLoaiDonVi = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
