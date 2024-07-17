import dayjs from 'dayjs/esm';

import { ICauHinhHoaDonDienTu, NewCauHinhHoaDonDienTu } from './cau-hinh-hoa-don-dien-tu.model';

export const sampleWithRequiredData: ICauHinhHoaDonDienTu = {
  id: 1889,
};

export const sampleWithPartialData: ICauHinhHoaDonDienTu = {
  id: 23952,
  apiUrl: 'out nursery tinted',
  accPass: 'from',
  username: 'deadly pioneer',
  nguoiThaoTac: 27389,
  ngayThaoTac: dayjs('2024-07-16'),
};

export const sampleWithFullData: ICauHinhHoaDonDienTu = {
  id: 13119,
  idDonVi: 23289,
  apiUrl: 'among boohoo courageously',
  account: '26096168',
  accPass: 'whoa',
  username: 'elastic upbeat ah',
  password: 'zowie',
  mauSo: 'gadzooks patter',
  kyHieu: 'obnoxiously duh pear',
  nguoiThaoTac: 8886,
  ngayThaoTac: dayjs('2024-07-16'),
};

export const sampleWithNewData: NewCauHinhHoaDonDienTu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
