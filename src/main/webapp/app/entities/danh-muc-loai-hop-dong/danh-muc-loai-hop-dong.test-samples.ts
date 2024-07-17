import dayjs from 'dayjs/esm';

import { IDanhMucLoaiHopDong, NewDanhMucLoaiHopDong } from './danh-muc-loai-hop-dong.model';

export const sampleWithRequiredData: IDanhMucLoaiHopDong = {
  id: 24788,
};

export const sampleWithPartialData: IDanhMucLoaiHopDong = {
  id: 4099,
  dienGiai: 'than glass',
  idVaiTro1: 10618,
  fileHopDong: 'where faraway alarmed',
  idDonVi: 27873,
  trangThai: 20388,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 10169,
  fileLoiChung: 'scornful focused trivial',
  chuyenTaiSan: 5826,
  loaiSuaDoi: 29276,
  srcCv: 'vastly',
  srcTb: 'once mechanically hungrily',
  srcTtpc: 'miniature softly orchid',
  dgTen: 'boo against aboard',
  nhomTen: 16479,
};

export const sampleWithFullData: IDanhMucLoaiHopDong = {
  id: 17230,
  idLoaiHd: 3431,
  dienGiai: 'separately conventional',
  idVaiTro1: 6839,
  idVaiTro2: 21864,
  fileHopDong: 'palatalize baritone this',
  srcHopDong: 'via',
  dieuKhoan: 'founding bah',
  idDonVi: 29988,
  trangThai: 29003,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 28926,
  srcLoiChung: 'jaded and',
  idNhom: 18931,
  fileLoiChung: 'out versus',
  chuyenTaiSan: 8638,
  loaiSuaDoi: 18086,
  loaiHuyBo: 15521,
  trangThaiDuyet: 9244,
  idPhanLoaiHopDong: 27026,
  srcCv: 'times',
  srcTb: 'coaxingly modulo',
  srcTtpc: 'the above',
  dgTen: 'smart canalise',
  nhomTen: 12417,
  idVaiTro3: 31757,
};

export const sampleWithNewData: NewDanhMucLoaiHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
