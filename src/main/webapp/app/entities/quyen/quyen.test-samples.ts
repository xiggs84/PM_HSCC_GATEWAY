import { IQuyen, NewQuyen } from './quyen.model';

export const sampleWithRequiredData: IQuyen = {
  id: 24956,
};

export const sampleWithPartialData: IQuyen = {
  id: 31365,
};

export const sampleWithFullData: IQuyen = {
  id: 22271,
  idQuyen: 5000,
  tenQuyen: 'bah revolve',
};

export const sampleWithNewData: NewQuyen = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
