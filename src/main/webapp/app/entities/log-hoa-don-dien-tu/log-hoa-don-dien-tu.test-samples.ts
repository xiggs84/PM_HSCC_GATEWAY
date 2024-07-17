import dayjs from 'dayjs/esm';

import { ILogHoaDonDienTu, NewLogHoaDonDienTu } from './log-hoa-don-dien-tu.model';

export const sampleWithRequiredData: ILogHoaDonDienTu = {
  id: 1395,
};

export const sampleWithPartialData: ILogHoaDonDienTu = {
  id: 17233,
  idDonVi: 5331,
  idHopDong: 11838,
  fKey: 'undermine worth',
  trangThai: 16395,
};

export const sampleWithFullData: ILogHoaDonDienTu = {
  id: 8302,
  idDonVi: 8979,
  idHopDong: 4459,
  fKey: 'incidentally busily',
  ketQua: 'beyond demand whimper',
  trangThai: 28914,
  ngayPhatHanh: dayjs('2024-07-16'),
};

export const sampleWithNewData: NewLogHoaDonDienTu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
