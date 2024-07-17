import { IDanhMucNoiCapQsh, NewDanhMucNoiCapQsh } from './danh-muc-noi-cap-qsh.model';

export const sampleWithRequiredData: IDanhMucNoiCapQsh = {
  id: 26329,
};

export const sampleWithPartialData: IDanhMucNoiCapQsh = {
  id: 26216,
  dienGiai: 'for armoire',
  idDonVi: 2665,
};

export const sampleWithFullData: IDanhMucNoiCapQsh = {
  id: 19487,
  idNoiCap: 3911,
  dienGiai: 'likewise wag',
  idDonVi: 20964,
};

export const sampleWithNewData: NewDanhMucNoiCapQsh = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
