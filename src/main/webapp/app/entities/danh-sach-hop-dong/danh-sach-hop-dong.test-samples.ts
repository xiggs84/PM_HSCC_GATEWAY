import dayjs from 'dayjs/esm';

import { IDanhSachHopDong, NewDanhSachHopDong } from './danh-sach-hop-dong.model';

export const sampleWithRequiredData: IDanhSachHopDong = {
  id: 17849,
};

export const sampleWithPartialData: IDanhSachHopDong = {
  id: 21464,
  ngayLapHd: dayjs('2024-07-16'),
  nguoiLapHd: 19510,
  trangThai: 5697,
  idLoaiHd: 13316,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 1720,
  srcHopDong: 'drawl',
  congChungVien: 20110,
  ngayThaoTacRutTrich: dayjs('2024-07-16'),
  quyenLaiSt: 'quantity awkward knottily',
  srcKySoPdf: 'round questioningly through',
};

export const sampleWithFullData: IDanhSachHopDong = {
  id: 20386,
  ngayLapHd: dayjs('2024-07-16'),
  nguoiLapHd: 23739,
  trangThai: 27617,
  idLoaiHd: 6078,
  idDonVi: 10879,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 14136,
  srcHopDong: 'hopelessly sans',
  soCongChung: 'overvalue lively',
  congChungVien: 9939,
  soTienRutTrich: 27309,
  hdThuCong: 22783,
  trangThaiRutTrich: 27601,
  chuKyNgoaiTruSo: 32286,
  strSearch: 'around awesome traumatic',
  ngayText: 'since',
  ngayRutTrichText: 'kosher dowse',
  ngayThaoTacRutTrich: dayjs('2024-07-16'),
  thuLaoCongChung: 31385,
  quyenLaiSt: 'tap mostly valuable',
  soLaiSt: 'ah than',
  quyenLaiTl: 'wrench ferociously insubstantial',
  soLaiTl: 'uh-huh station',
  srcKySoPdf: 'wrongly rabbi',
  srcKySoPdfSigned: 'suede reluctantly buzzing',
};

export const sampleWithNewData: NewDanhSachHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
