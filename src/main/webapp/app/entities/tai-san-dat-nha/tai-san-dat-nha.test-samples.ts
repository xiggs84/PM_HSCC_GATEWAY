import dayjs from 'dayjs/esm';

import { ITaiSanDatNha, NewTaiSanDatNha } from './tai-san-dat-nha.model';

export const sampleWithRequiredData: ITaiSanDatNha = {
  id: 2212,
};

export const sampleWithPartialData: ITaiSanDatNha = {
  id: 8122,
  idTaiSan: 32238,
  tenTaiSan: 'republic',
  thongTinTs: 'about drat blackbird',
  idLoaiTs: 28308,
  ngayThaoTac: dayjs('2024-07-16'),
  idLoaiNganChan: 831,
  ngayBdNganChan: dayjs('2024-07-16'),
  ngayKtNganChan: dayjs('2024-07-17'),
  strSearch: 'alongside buoyant',
  soHsCv: 22423,
  moTa: 'er owlishly',
};

export const sampleWithFullData: ITaiSanDatNha = {
  id: 27995,
  idTaiSan: 29236,
  tenTaiSan: 'cautiously loosely',
  trangThai: 25549,
  thongTinTs: 'up',
  idLoaiTs: 25780,
  ghiChu: 'searchingly dearest',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 29579,
  idDuongSu: 25571,
  idTsGoc: 29593,
  maTaiSan: 'pfft',
  idTinhTrang: 25464,
  idLoaiNganChan: 21200,
  ngayBdNganChan: dayjs('2024-07-16'),
  ngayKtNganChan: dayjs('2024-07-16'),
  idMaster: 5224,
  strSearch: 'afore',
  idDonVi: 1667,
  soHsCv: 6831,
  soCc: 20255,
  soVaoSo: 28731,
  moTa: 'zowie',
  loaiNganChan: 14886,
};

export const sampleWithNewData: NewTaiSanDatNha = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
