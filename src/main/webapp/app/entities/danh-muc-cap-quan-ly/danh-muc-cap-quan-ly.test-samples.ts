import { IDanhMucCapQuanLy, NewDanhMucCapQuanLy } from './danh-muc-cap-quan-ly.model';

export const sampleWithRequiredData: IDanhMucCapQuanLy = {
  id: 7506,
};

export const sampleWithPartialData: IDanhMucCapQuanLy = {
  id: 461,
};

export const sampleWithFullData: IDanhMucCapQuanLy = {
  id: 19799,
  idCapQl: 29027,
  dienGiai: 'valiantly briskly truthfully',
};

export const sampleWithNewData: NewDanhMucCapQuanLy = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
