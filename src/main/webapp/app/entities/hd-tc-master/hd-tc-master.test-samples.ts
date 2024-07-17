import dayjs from 'dayjs/esm';

import { IHdTcMaster, NewHdTcMaster } from './hd-tc-master.model';

export const sampleWithRequiredData: IHdTcMaster = {
  id: 30715,
};

export const sampleWithPartialData: IHdTcMaster = {
  id: 15467,
  ngayLapHd: dayjs('2024-07-16'),
  nguoiLapHd: 356,
  thongTinVanBan: 'hungrily',
  idLoaiHd: 24856,
  dieuKhoanHd: 'contour circa along',
  idDonVi: 1740,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 1144,
  idHdGoc: 27176,
  maHopDong: 'even bathrobe aha',
  srcHopDong: 'woot curiously',
  ngayHen: dayjs('2024-07-16'),
  idSoCongChung: 27692,
  congChungVien: 3703,
  nguoiRutTrich: 8171,
  soTienRutTrich: 13957,
  ngayRutTrich: dayjs('2024-07-16'),
  chuKyNgoaiTruSo: 12257,
  idHdSdHb: 10737,
};

export const sampleWithFullData: IHdTcMaster = {
  id: 24712,
  idHopDong: 9915,
  ngayLapHd: dayjs('2024-07-16'),
  nguoiLapHd: 2410,
  thongTinDuongSu: 'sans',
  thongTinTaiSan: 'infantilise deeply till',
  thongTinVanBan: 'pliers',
  trangThai: 18819,
  idLoaiHd: 15158,
  dieuKhoanHd: 'even bottling',
  idDonVi: 542,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 16239,
  idHdGoc: 12707,
  thongTinChuyenNhuong: 'when knottily as',
  maHopDong: 'worth',
  srcHopDong: 'unwelcome',
  ngayHen: dayjs('2024-07-16'),
  idSoCongChung: 18312,
  soCongChung: 'across',
  congChungVien: 23926,
  ngayKyHd: dayjs('2024-07-16'),
  nguoiRutTrich: 9889,
  soTienRutTrich: 8784,
  ngayRutTrich: dayjs('2024-07-16'),
  hdThuCong: 8796,
  trangThaiRutTrich: 26958,
  chuKyNgoaiTruSo: 822,
  strSearch: 'upright yak before',
  idMaster: 22236,
  idHdSdHb: 18148,
  srcDmMaster: 'quaintly',
  repRefUnique: 24532,
};

export const sampleWithNewData: NewHdTcMaster = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
