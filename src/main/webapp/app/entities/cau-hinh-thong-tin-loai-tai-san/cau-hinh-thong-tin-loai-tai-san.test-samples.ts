import { ICauHinhThongTinLoaiTaiSan, NewCauHinhThongTinLoaiTaiSan } from './cau-hinh-thong-tin-loai-tai-san.model';

export const sampleWithRequiredData: ICauHinhThongTinLoaiTaiSan = {
  id: 6386,
};

export const sampleWithPartialData: ICauHinhThongTinLoaiTaiSan = {
  id: 28712,
  noiDung: 'even mmm since',
  javascript: 'before ack meh',
  css: 'supposing',
  idLoaiTs: 9146,
  trangThai: 15435,
  xml: 'grace macrame',
};

export const sampleWithFullData: ICauHinhThongTinLoaiTaiSan = {
  id: 16059,
  idCauHinh: 23701,
  noiDung: 'swank',
  javascript: 'impel',
  css: 'incommode',
  idLoaiTs: 19027,
  idDonVi: 16758,
  trangThai: 5972,
  xml: 'hut duh',
};

export const sampleWithNewData: NewCauHinhThongTinLoaiTaiSan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
