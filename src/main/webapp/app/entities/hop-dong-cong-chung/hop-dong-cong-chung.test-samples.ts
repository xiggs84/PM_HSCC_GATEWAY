import dayjs from 'dayjs/esm';

import { IHopDongCongChung, NewHopDongCongChung } from './hop-dong-cong-chung.model';

export const sampleWithRequiredData: IHopDongCongChung = {
  id: 16662,
};

export const sampleWithPartialData: IHopDongCongChung = {
  id: 28239,
  ngayLapHd: dayjs('2024-07-16'),
  thongTinTaiSan: 'microphone disorientate',
  thongTinVanBan: 'drat contravene',
  ngayThaoTac: dayjs('2024-07-16'),
  idHdGoc: 15870,
  thongTinChuyenNhuong: 'gah until',
  maHopDong: 'blade',
  srcHopDong: 'flicker',
  ngayHen: dayjs('2024-07-17'),
  congChungVien: 23989,
  ngayKyHd: dayjs('2024-07-16'),
  soTienRutTrich: 17506,
  ngayRutTrich: dayjs('2024-07-16'),
  hdThuCong: 3696,
  strSearch: 'aboard worth under',
  srcDmMaster: 'once into',
  ngayText: 'blah concrete',
  ngayNum: 18372,
  ngayThaoTacRutTrich: dayjs('2024-07-16'),
  quyenLaiSt: 'undershirt sticky',
  quyenLaiTl: 'oh loosely let',
  srcKySoPdfSigned: 'who rundown schnitzel',
  ngayRutTrichText: 'so save',
};

export const sampleWithFullData: IHopDongCongChung = {
  id: 22582,
  idHopDong: 3992,
  ngayLapHd: dayjs('2024-07-17'),
  nguoiLapHd: 15628,
  thongTinDuongSu: 'bad if provided',
  thongTinTaiSan: 'fooey what impediment',
  thongTinVanBan: 'at however',
  trangThai: 11198,
  idLoaiHd: 22694,
  dieuKhoanHd: 'ruin',
  idDonVi: 32505,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 13048,
  idHdGoc: 3088,
  thongTinChuyenNhuong: 'for',
  maHopDong: 'which oddly',
  srcHopDong: 'veg too',
  ngayHen: dayjs('2024-07-16'),
  soCongChung: 'too eaves',
  congChungVien: 10677,
  ngayKyHd: dayjs('2024-07-16'),
  nguoiRutTrich: 26333,
  soTienRutTrich: 537,
  ngayRutTrich: dayjs('2024-07-16'),
  hdThuCong: 27655,
  trangThaiRutTrich: 5206,
  chuKyNgoaiTruSo: 24038,
  strSearch: 'because militarise',
  idMaster: 32607,
  idHdSdHb: 14221,
  srcDmMaster: 'brr',
  repRefUnique: 8442,
  ngayText: 'reorganization',
  ngayNum: 23564,
  ngayThaoTacRutTrich: dayjs('2024-07-16'),
  thuLaoCongChung: 10403,
  quyenLaiSt: 'why diligently',
  soLaiSt: 'truly frightfully',
  quyenLaiTl: 'athletic',
  soLaiTl: 'notwithstanding',
  srcKySoPdf: 'why inside',
  srcKySoPdfSigned: 'kiwi whether overindulge',
  syncStatus: 13114,
  ngayRutTrichText: 'um reason',
};

export const sampleWithNewData: NewHopDongCongChung = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
