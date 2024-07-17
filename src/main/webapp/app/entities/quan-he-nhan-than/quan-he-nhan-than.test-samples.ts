import { IQuanHeNhanThan, NewQuanHeNhanThan } from './quan-he-nhan-than.model';

export const sampleWithRequiredData: IQuanHeNhanThan = {
  id: 25380,
};

export const sampleWithPartialData: IQuanHeNhanThan = {
  id: 20000,
  dienGiai: 'coin posture',
  idGioiTinh: 25892,
};

export const sampleWithFullData: IQuanHeNhanThan = {
  id: 25985,
  idQuanHe: 29846,
  dienGiai: 'flippant instead sans',
  idQuanHeDoiUng: 13668,
  idGioiTinh: 510,
};

export const sampleWithNewData: NewQuanHeNhanThan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
