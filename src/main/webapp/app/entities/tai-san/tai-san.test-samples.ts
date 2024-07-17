import dayjs from 'dayjs/esm';

import { ITaiSan, NewTaiSan } from './tai-san.model';

export const sampleWithRequiredData: ITaiSan = {
  id: 19598,
};

export const sampleWithPartialData: ITaiSan = {
  id: 6933,
  idTaiSan: 6004,
  trangThai: 27391,
  idDuongSu: 1212,
  maTaiSan: 'blah demineralize growing',
  idMaster: 23791,
  idDonVi: 31893,
  soHsCv: 28469,
  loaiNganChan: 6299,
  syncStatus: 20081,
};

export const sampleWithFullData: ITaiSan = {
  id: 31335,
  idTaiSan: 21569,
  tenTaiSan: 'bah rock',
  trangThai: 23810,
  thongTinTs: 'clearly provided',
  ghiChu: 'softly mild',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 179,
  idDuongSu: 13979,
  idTsGoc: 29849,
  maTaiSan: 'incidentally fax',
  idLoaiNganChan: 22297,
  ngayBdNganChan: dayjs('2024-07-16'),
  ngayKtNganChan: dayjs('2024-07-16'),
  idMaster: 21898,
  strSearch: 'opulent nervous',
  idDonVi: 5238,
  soHsCv: 32445,
  soCc: 27732,
  soVaoSo: 11649,
  moTa: 'yahoo',
  loaiNganChan: 10355,
  syncStatus: 13495,
};

export const sampleWithNewData: NewTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
