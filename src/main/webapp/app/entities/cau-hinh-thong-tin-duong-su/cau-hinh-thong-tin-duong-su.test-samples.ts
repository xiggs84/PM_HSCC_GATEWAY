import { ICauHinhThongTinDuongSu, NewCauHinhThongTinDuongSu } from './cau-hinh-thong-tin-duong-su.model';

export const sampleWithRequiredData: ICauHinhThongTinDuongSu = {
  id: 8967,
};

export const sampleWithPartialData: ICauHinhThongTinDuongSu = {
  id: 20143,
  idCauHinh: 16122,
  idLoaiDs: 15170,
  trangThai: 25349,
};

export const sampleWithFullData: ICauHinhThongTinDuongSu = {
  id: 13408,
  idCauHinh: 24395,
  noiDung: 'strobe inlay',
  javascript: 'astride unsightly tummy',
  css: 'nearly',
  idLoaiDs: 9602,
  idDonVi: 26823,
  trangThai: 27087,
};

export const sampleWithNewData: NewCauHinhThongTinDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
