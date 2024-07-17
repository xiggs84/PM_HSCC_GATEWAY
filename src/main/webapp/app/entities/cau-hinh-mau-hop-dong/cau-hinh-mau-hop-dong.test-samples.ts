import dayjs from 'dayjs/esm';

import { ICauHinhMauHopDong, NewCauHinhMauHopDong } from './cau-hinh-mau-hop-dong.model';

export const sampleWithRequiredData: ICauHinhMauHopDong = {
  id: 12955,
};

export const sampleWithPartialData: ICauHinhMauHopDong = {
  id: 23459,
  idLoaiHd: 18036,
  idVaiTro1: 27123,
  fileHopDong: 'misguided',
  srcHopDong: 'grassland',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 12060,
  idNhom: 21413,
  fileLoiChung: 'over excluding',
  chuyenTaiSan: 24821,
  loaiSuaDoi: 28738,
  idPhanLoaiHopDong: 25818,
  srcCv: 'darling',
  srcTb: 'astronomy aluminum around',
  srcTtpc: 'against speedy',
};

export const sampleWithFullData: ICauHinhMauHopDong = {
  id: 1643,
  idLoaiHd: 9197,
  dienGiai: 'curtail that verbally',
  idVaiTro1: 787,
  idVaiTro2: 19710,
  fileHopDong: 'opposite modulo',
  srcHopDong: 'unethically hence portion',
  dieuKhoan: 'worrisome',
  idDonVi: 5033,
  trangThai: 8246,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 28178,
  srcLoiChung: 'owe finally',
  idNhom: 27966,
  fileLoiChung: 'pressurize',
  chuyenTaiSan: 20591,
  loaiSuaDoi: 24277,
  loaiHuyBo: 2893,
  trangThaiDuyet: 14945,
  idPhanLoaiHopDong: 8842,
  srcCv: 'brave moor',
  srcTb: 'zowie',
  srcTtpc: 'courageous browse',
  idVaiTro3: 25416,
};

export const sampleWithNewData: NewCauHinhMauHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
