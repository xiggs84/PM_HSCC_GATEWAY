import dayjs from 'dayjs/esm';

import { IVanBan, NewVanBan } from './van-ban.model';

export const sampleWithRequiredData: IVanBan = {
  id: 5070,
};

export const sampleWithPartialData: IVanBan = {
  id: 24571,
  dienGiai: 'ugh',
  tenFile: 'retreat eek gorgeous',
  srcFile: 'fairly yahoo though',
  idLoaiVb: 14040,
  trangThai: 24365,
  ngayThaoTac: dayjs('2024-07-17'),
  nguoiThaoTac: 20072,
};

export const sampleWithFullData: IVanBan = {
  id: 263,
  idVanBan: 16775,
  dienGiai: 'distort how',
  tenFile: 'greedy till',
  srcFile: 'sonata excerpt atop',
  idLoaiVb: 10042,
  trangThai: 7103,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 18352,
  idDonVi: 15536,
  idVbGoc: 5731,
};

export const sampleWithNewData: NewVanBan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
