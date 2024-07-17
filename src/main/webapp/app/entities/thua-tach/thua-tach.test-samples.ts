import { IThuaTach, NewThuaTach } from './thua-tach.model';

export const sampleWithRequiredData: IThuaTach = {
  id: 23012,
};

export const sampleWithPartialData: IThuaTach = {
  id: 11748,
  idThuaTach: 6361,
  trangThai: 13055,
};

export const sampleWithFullData: IThuaTach = {
  id: 24391,
  idThuaTach: 565,
  idTaiSan: 20533,
  thongTinThuaTach: 'helpfully',
  trangThai: 26968,
};

export const sampleWithNewData: NewThuaTach = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
