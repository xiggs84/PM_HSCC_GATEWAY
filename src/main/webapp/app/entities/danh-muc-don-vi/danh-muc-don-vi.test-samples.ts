import dayjs from 'dayjs/esm';

import { IDanhMucDonVi, NewDanhMucDonVi } from './danh-muc-don-vi.model';

export const sampleWithRequiredData: IDanhMucDonVi = {
  id: 5676,
};

export const sampleWithPartialData: IDanhMucDonVi = {
  id: 3980,
  idDonVi: 5350,
  nguoiDaiDien: 'mountainous primary nor',
  soDienThoai: 'advantage suspiciously',
  idDonViQl: 18508,
  loaiDonVi: 269,
  trangThai: 29601,
  idCapQl: 18650,
  loaiNhiemVu: 11792,
  hoaDonDt: 22423,
  maDonViIgate: 'ugh rigidly hm',
  kySo: 12536,
  isElastic: 3519,
  apikeyCccd: 'whoa yuck',
  verifyCodeCccd: 'stir pish',
  usernameElastic: 'if but',
  passwordElastic: 'apropos',
};

export const sampleWithFullData: IDanhMucDonVi = {
  id: 9026,
  idDonVi: 5528,
  tenDonVi: 'pervade atop whoever',
  diaChi: 'gleefully hardship late',
  nguoiDaiDien: 'beautifully when shrilly',
  soDienThoai: 'lounge',
  idDonViQl: 17087,
  loaiDonVi: 1146,
  ngayKhaiBao: dayjs('2024-07-16'),
  trangThai: 21424,
  soNha: 'vibrant when blah',
  maSoThue: 'briefly meanwhile guess',
  idCapQl: 16606,
  loaiNhiemVu: 985,
  hoaDonDt: 15064,
  maDonViIgate: 'poor unbearably',
  maCoQuanIgate: 'impressive usher spotless',
  capDonVi: 28733,
  kySo: 7399,
  qrScan: 18803,
  verifyIdCard: 7960,
  isVerifyFace: 15102,
  isElastic: 25898,
  apikeyCccd: 'that',
  apikeyFace: 'eek pathogenesis',
  verifyCodeCccd: 'buttery deduce',
  usernameElastic: 'pfft behind',
  passwordElastic: 'verify',
};

export const sampleWithNewData: NewDanhMucDonVi = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
