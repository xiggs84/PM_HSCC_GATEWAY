import { IMenuQuyen, NewMenuQuyen } from './menu-quyen.model';

export const sampleWithRequiredData: IMenuQuyen = {
  id: 6008,
};

export const sampleWithPartialData: IMenuQuyen = {
  id: 20698,
};

export const sampleWithFullData: IMenuQuyen = {
  id: 13926,
  idQuyen: 3512,
  idDonVi: 26133,
  listMenu: 'near unlike',
};

export const sampleWithNewData: NewMenuQuyen = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
