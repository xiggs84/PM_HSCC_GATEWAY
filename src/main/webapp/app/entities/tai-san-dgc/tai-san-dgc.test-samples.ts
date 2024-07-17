import dayjs from 'dayjs/esm';

import { ITaiSanDgc, NewTaiSanDgc } from './tai-san-dgc.model';

export const sampleWithRequiredData: ITaiSanDgc = {
  id: 9930,
};

export const sampleWithPartialData: ITaiSanDgc = {
  id: 10058,
  idTaiSan: 24682,
  trangThai: 23829,
  idLoaiTs: 6712,
  ghiChu: 'partner gadzooks',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 20230,
  idTsGoc: 29881,
  idLoaiNganChan: 6382,
  ngayBdNganChan: dayjs('2024-07-16'),
  ngayKtNganChan: dayjs('2024-07-16'),
  idMaster: 29306,
  idDonVi: 15133,
  soVaoSo: 12866,
};

export const sampleWithFullData: ITaiSanDgc = {
  id: 29068,
  idTaiSan: 17919,
  tenTaiSan: 'tutu aw ack',
  trangThai: 32337,
  thongTinTs: 'consequently',
  idLoaiTs: 7628,
  ghiChu: 'whispered siding advanced',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 21656,
  idDuongSu: 32405,
  idTsGoc: 3526,
  maTaiSan: 'really uh-huh atop',
  idTinhTrang: 6944,
  idLoaiNganChan: 8990,
  ngayBdNganChan: dayjs('2024-07-16'),
  ngayKtNganChan: dayjs('2024-07-16'),
  idMaster: 12936,
  strSearch: 'whenever yum aw',
  idDonVi: 30650,
  soHsCv: 8839,
  soCc: 31885,
  soVaoSo: 11401,
  moTa: 'huzzah',
};

export const sampleWithNewData: NewTaiSanDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
