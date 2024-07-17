import { ICanBoQuyen, NewCanBoQuyen } from './can-bo-quyen.model';

export const sampleWithRequiredData: ICanBoQuyen = {
  id: 23949,
};

export const sampleWithPartialData: ICanBoQuyen = {
  id: 9058,
};

export const sampleWithFullData: ICanBoQuyen = {
  id: 21166,
  idQuyen: 10534,
};

export const sampleWithNewData: NewCanBoQuyen = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
