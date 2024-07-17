import { IDanhMucKeyDanhTuFaq, NewDanhMucKeyDanhTuFaq } from './danh-muc-key-danh-tu-faq.model';

export const sampleWithRequiredData: IDanhMucKeyDanhTuFaq = {
  id: 18449,
};

export const sampleWithPartialData: IDanhMucKeyDanhTuFaq = {
  id: 20098,
};

export const sampleWithFullData: IDanhMucKeyDanhTuFaq = {
  id: 18715,
  idCauHoi: 1936,
  keyDanhTu: 'chilly while',
};

export const sampleWithNewData: NewDanhMucKeyDanhTuFaq = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
