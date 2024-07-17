import dayjs from 'dayjs/esm';

import { IThongTinChungHopDong, NewThongTinChungHopDong } from './thong-tin-chung-hop-dong.model';

export const sampleWithRequiredData: IThongTinChungHopDong = {
  id: 27203,
};

export const sampleWithPartialData: IThongTinChungHopDong = {
  id: 17630,
  thongTinVanBan: 'fair except',
  trangThai: 6437,
  idLoaiHd: 14769,
  dieuKhoanHd: 'literature miscount',
  idHdGoc: 10381,
  ngayHen: dayjs('2024-07-17'),
  soCongChung: 20074,
  ngayKyHd: dayjs('2024-07-16'),
  hdThuCong: 21691,
  chuKyNgoaiTruSo: 10458,
  strSearch: 'concerning rating',
  idMaster: 14306,
  idHdSdHb: 18274,
  repRefUnique: 17510,
  ngayText: 'server whether before',
  thongTinChungClob: 'transom',
};

export const sampleWithFullData: IThongTinChungHopDong = {
  id: 13227,
  ngayLapHd: dayjs('2024-07-16'),
  nguoiLapHd: 26404,
  thongTinVanBan: 'establish pique',
  trangThai: 29164,
  idLoaiHd: 1513,
  dieuKhoanHd: 'saffron',
  idDonVi: 19932,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 24130,
  idHdGoc: 6807,
  maHopDong: 'boo so',
  srcHopDong: 'arithmetic square the',
  ngayHen: dayjs('2024-07-16'),
  soCongChung: 9912,
  congChungVien: 15295,
  ngayKyHd: dayjs('2024-07-16'),
  nguoiRutTrich: 30042,
  soTienRutTrich: 22375,
  ngayRutTrich: dayjs('2024-07-16'),
  hdThuCong: 27349,
  trangThaiRutTrich: 23681,
  chuKyNgoaiTruSo: 28447,
  strSearch: 'er',
  idMaster: 479,
  idHdSdHb: 30779,
  srcDmMaster: 'expel',
  repRefUnique: 4674,
  ngayText: 'consequently tablet',
  thongTinChung: 'advanced boohoo watchful',
  thongTinChungClob: 'an promulgate bludgeon',
};

export const sampleWithNewData: NewThongTinChungHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
