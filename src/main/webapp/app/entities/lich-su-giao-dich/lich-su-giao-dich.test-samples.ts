import dayjs from 'dayjs/esm';

import { ILichSuGiaoDich, NewLichSuGiaoDich } from './lich-su-giao-dich.model';

export const sampleWithRequiredData: ILichSuGiaoDich = {
  id: 29531,
};

export const sampleWithPartialData: ILichSuGiaoDich = {
  id: 30382,
  idDuongSu: 16421,
  ngayThaoTac: dayjs('2024-07-16'),
  idChungThuc: 28779,
};

export const sampleWithFullData: ILichSuGiaoDich = {
  id: 26583,
  idTaiSan: 13641,
  idDuongSu: 30496,
  trangThai: 19680,
  ngayThaoTac: dayjs('2024-07-16'),
  idHopDong: 5689,
  idLoaiHopDong: 22614,
  idChungThuc: 18252,
};

export const sampleWithNewData: NewLichSuGiaoDich = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
