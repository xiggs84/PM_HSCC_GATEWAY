import { IDmNoiCapGpdkx, NewDmNoiCapGpdkx } from './dm-noi-cap-gpdkx.model';

export const sampleWithRequiredData: IDmNoiCapGpdkx = {
  id: 30812,
};

export const sampleWithPartialData: IDmNoiCapGpdkx = {
  id: 781,
};

export const sampleWithFullData: IDmNoiCapGpdkx = {
  id: 3295,
  idNoiCap: 26330,
  dienGiai: 'phew lest',
  idDonVi: 6871,
  trangThai: 8762,
};

export const sampleWithNewData: NewDmNoiCapGpdkx = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
