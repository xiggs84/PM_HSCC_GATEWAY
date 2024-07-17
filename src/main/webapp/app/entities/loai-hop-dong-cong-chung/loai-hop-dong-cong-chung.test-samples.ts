import { ILoaiHopDongCongChung, NewLoaiHopDongCongChung } from './loai-hop-dong-cong-chung.model';

export const sampleWithRequiredData: ILoaiHopDongCongChung = {
  id: 19428,
};

export const sampleWithPartialData: ILoaiHopDongCongChung = {
  id: 12260,
  idLoaiHopDongCongChung: 2948,
  giaTri: 23591,
  trangThai: 26305,
};

export const sampleWithFullData: ILoaiHopDongCongChung = {
  id: 12455,
  idLoaiHopDongCongChung: 13640,
  dienGiai: 'gracefully timely fooey',
  giaTri: 12457,
  trangThai: 1634,
};

export const sampleWithNewData: NewLoaiHopDongCongChung = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
