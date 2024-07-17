import { ICauHinhHopDong, NewCauHinhHopDong } from './cau-hinh-hop-dong.model';

export const sampleWithRequiredData: ICauHinhHopDong = {
  id: 15498,
};

export const sampleWithPartialData: ICauHinhHopDong = {
  id: 28727,
  idLoaiHopDong: 2677,
  tienTo: 'junk next shy',
  trangThai: 7352,
};

export const sampleWithFullData: ICauHinhHopDong = {
  id: 11401,
  idLoaiHopDong: 10063,
  idDonVi: 3008,
  chieuDai: 19368,
  tienTo: 'warble',
  giaTri: 16312,
  hienThi: 'rations',
  trangThai: 21795,
};

export const sampleWithNewData: NewCauHinhHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
