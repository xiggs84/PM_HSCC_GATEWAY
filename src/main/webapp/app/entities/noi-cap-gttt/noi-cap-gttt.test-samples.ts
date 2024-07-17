import { INoiCapGttt, NewNoiCapGttt } from './noi-cap-gttt.model';

export const sampleWithRequiredData: INoiCapGttt = {
  id: 10659,
};

export const sampleWithPartialData: INoiCapGttt = {
  id: 23883,
  idNoiCap: 20468,
  trangThai: 9271,
};

export const sampleWithFullData: INoiCapGttt = {
  id: 17033,
  idNoiCap: 25544,
  dienGiai: 'roughly unexpectedly',
  idDonVi: 28445,
  trangThai: 10420,
};

export const sampleWithNewData: NewNoiCapGttt = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
