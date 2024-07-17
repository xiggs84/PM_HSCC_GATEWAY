import { ITaisanSaiQsddDgc, NewTaisanSaiQsddDgc } from './taisan-sai-qsdd-dgc.model';

export const sampleWithRequiredData: ITaisanSaiQsddDgc = {
  id: 19538,
};

export const sampleWithPartialData: ITaisanSaiQsddDgc = {
  id: 26071,
  idMaster: 11282,
};

export const sampleWithFullData: ITaisanSaiQsddDgc = {
  id: 11643,
  idMaster: 3244,
  noiCapQsdd: 'blah ew bayou',
};

export const sampleWithNewData: NewTaisanSaiQsddDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
