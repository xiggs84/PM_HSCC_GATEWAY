import { IDanhMucFaq, NewDanhMucFaq } from './danh-muc-faq.model';

export const sampleWithRequiredData: IDanhMucFaq = {
  id: 87,
};

export const sampleWithPartialData: IDanhMucFaq = {
  id: 27354,
  noiDung: 'yippee nudge',
  cauTraLoi: 'mmm',
  loai: 9853,
};

export const sampleWithFullData: IDanhMucFaq = {
  id: 10473,
  idCauHoi: 7880,
  noiDung: 'feminine',
  cauTraLoi: 'yippee interaction arrogantly',
  loai: 4744,
};

export const sampleWithNewData: NewDanhMucFaq = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
