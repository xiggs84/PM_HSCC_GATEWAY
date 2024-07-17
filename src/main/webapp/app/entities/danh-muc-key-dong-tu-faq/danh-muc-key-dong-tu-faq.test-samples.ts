import { IDanhMucKeyDongTuFaq, NewDanhMucKeyDongTuFaq } from './danh-muc-key-dong-tu-faq.model';

export const sampleWithRequiredData: IDanhMucKeyDongTuFaq = {
  id: 24238,
};

export const sampleWithPartialData: IDanhMucKeyDongTuFaq = {
  id: 32509,
  idCauHoi: 15173,
  keyDongTu: 'apud gosh',
};

export const sampleWithFullData: IDanhMucKeyDongTuFaq = {
  id: 5102,
  idCauHoi: 15703,
  keyDongTu: 'ham which',
};

export const sampleWithNewData: NewDanhMucKeyDongTuFaq = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
