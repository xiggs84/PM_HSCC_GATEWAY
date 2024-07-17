import dayjs from 'dayjs/esm';

import { ISoLanHoiFaq, NewSoLanHoiFaq } from './so-lan-hoi-faq.model';

export const sampleWithRequiredData: ISoLanHoiFaq = {
  id: 15208,
};

export const sampleWithPartialData: ISoLanHoiFaq = {
  id: 16188,
  idCanBo: 11303,
  ngayThaoTac: dayjs('2024-07-16'),
};

export const sampleWithFullData: ISoLanHoiFaq = {
  id: 31698,
  idCauHoi: 11422,
  idCanBo: 27621,
  ngayThaoTac: dayjs('2024-07-16'),
};

export const sampleWithNewData: NewSoLanHoiFaq = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
