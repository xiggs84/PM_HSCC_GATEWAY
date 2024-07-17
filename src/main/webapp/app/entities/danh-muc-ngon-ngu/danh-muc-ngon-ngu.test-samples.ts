import { IDanhMucNgonNgu, NewDanhMucNgonNgu } from './danh-muc-ngon-ngu.model';

export const sampleWithRequiredData: IDanhMucNgonNgu = {
  id: 8345,
};

export const sampleWithPartialData: IDanhMucNgonNgu = {
  id: 16897,
  idNgonNgu: 20475,
  dienGiai: 'so',
  vietTat: 'receiver bongo',
};

export const sampleWithFullData: IDanhMucNgonNgu = {
  id: 32373,
  idNgonNgu: 9774,
  dienGiai: 'near patiently',
  vietTat: 'while throughout',
};

export const sampleWithNewData: NewDanhMucNgonNgu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
