import { IQuanHeMaster, NewQuanHeMaster } from './quan-he-master.model';

export const sampleWithRequiredData: IQuanHeMaster = {
  id: 13245,
};

export const sampleWithPartialData: IQuanHeMaster = {
  id: 5719,
  idDuongSu: 8805,
  idDuongSuQh: 10169,
};

export const sampleWithFullData: IQuanHeMaster = {
  id: 15736,
  idDuongSu: 20974,
  idDuongSuQh: 23337,
};

export const sampleWithNewData: NewQuanHeMaster = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
