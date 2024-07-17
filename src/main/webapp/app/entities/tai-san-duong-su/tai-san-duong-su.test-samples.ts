import dayjs from 'dayjs/esm';

import { ITaiSanDuongSu, NewTaiSanDuongSu } from './tai-san-duong-su.model';

export const sampleWithRequiredData: ITaiSanDuongSu = {
  id: 21319,
};

export const sampleWithPartialData: ITaiSanDuongSu = {
  id: 30113,
  idDuongSu: 7949,
  ngayThaoTac: dayjs('2024-07-16'),
  idLoaiHopDong: 27041,
  idChungThuc: 17129,
};

export const sampleWithFullData: ITaiSanDuongSu = {
  id: 20771,
  trangThai: 5112,
  idDuongSu: 9465,
  ngayThaoTac: dayjs('2024-07-16'),
  idLoaiHopDong: 13770,
  idChungThuc: 11990,
};

export const sampleWithNewData: NewTaiSanDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
