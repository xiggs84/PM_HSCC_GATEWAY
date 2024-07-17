import dayjs from 'dayjs/esm';

import { ILogDangNhap, NewLogDangNhap } from './log-dang-nhap.model';

export const sampleWithRequiredData: ILogDangNhap = {
  id: 7851,
};

export const sampleWithPartialData: ILogDangNhap = {
  id: 28916,
  ngayDangNhap: dayjs('2024-07-16'),
  tenDangNhap: 'sweetly fall',
};

export const sampleWithFullData: ILogDangNhap = {
  id: 16395,
  ngayDangNhap: dayjs('2024-07-16'),
  ipAddress: 'whereas',
  idCanBo: 28780,
  tenDangNhap: 'baobab past eek',
};

export const sampleWithNewData: NewLogDangNhap = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
