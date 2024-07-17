import { IQuanHeDuongSu, NewQuanHeDuongSu } from './quan-he-duong-su.model';

export const sampleWithRequiredData: IQuanHeDuongSu = {
  id: 8166,
};

export const sampleWithPartialData: IQuanHeDuongSu = {
  id: 6947,
  idDuongSu: 11735,
  trangThai: 10005,
};

export const sampleWithFullData: IQuanHeDuongSu = {
  id: 9776,
  idDuongSu: 6680,
  idDuongSuQh: 6370,
  idQuanHe: 16794,
  thongTinQuanHe: 'schmooze versus salesman',
  trangThai: 29833,
};

export const sampleWithNewData: NewQuanHeDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
