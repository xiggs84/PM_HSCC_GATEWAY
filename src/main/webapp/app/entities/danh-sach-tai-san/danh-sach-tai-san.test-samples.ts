import dayjs from 'dayjs/esm';

import { IDanhSachTaiSan, NewDanhSachTaiSan } from './danh-sach-tai-san.model';

export const sampleWithRequiredData: IDanhSachTaiSan = {
  id: 11130,
};

export const sampleWithPartialData: IDanhSachTaiSan = {
  id: 2249,
  trangThai: 27024,
  ghiChu: 'courageously',
  ngayThaoTac: dayjs('2024-07-16'),
  idTsGoc: 15593,
  idTinhTrang: 19295,
  ngayBdNganChan: dayjs('2024-07-16'),
  strSearch: 'whoa',
  soCc: 22572,
  soVaoSo: 29111,
  moTa: 'everybody gracefully yuck',
};

export const sampleWithFullData: IDanhSachTaiSan = {
  id: 16669,
  idTaiSan: 350,
  tenTaiSan: 'shelf fully',
  trangThai: 22778,
  ghiChu: 'phooey anxiously',
  ngayThaoTac: dayjs('2024-07-17'),
  nguoiThaoTac: 3394,
  idDuongSu: 6926,
  idTsGoc: 27220,
  maTaiSan: 'favorite',
  idTinhTrang: 31010,
  idLoaiNganChan: 19338,
  ngayBdNganChan: dayjs('2024-07-16'),
  ngayKtNganChan: dayjs('2024-07-16'),
  idMaster: 21274,
  strSearch: 'new odd',
  idDonVi: 3588,
  soHsCv: 17779,
  soCc: 16847,
  soVaoSo: 9425,
  moTa: 'than',
  loaiNganChan: 29009,
  maXa: 'how',
};

export const sampleWithNewData: NewDanhSachTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
