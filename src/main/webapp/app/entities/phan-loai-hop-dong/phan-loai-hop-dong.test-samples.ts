import { IPhanLoaiHopDong, NewPhanLoaiHopDong } from './phan-loai-hop-dong.model';

export const sampleWithRequiredData: IPhanLoaiHopDong = {
  id: 4397,
};

export const sampleWithPartialData: IPhanLoaiHopDong = {
  id: 15392,
  dienGiai: 'yowza hide whereas',
};

export const sampleWithFullData: IPhanLoaiHopDong = {
  id: 24158,
  idPhanLoaiHopDong: 13762,
  dienGiai: 'required filly',
};

export const sampleWithNewData: NewPhanLoaiHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
