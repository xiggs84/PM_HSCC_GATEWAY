import dayjs from 'dayjs/esm';

import { IDanhMucCanBo, NewDanhMucCanBo } from './danh-muc-can-bo.model';

export const sampleWithRequiredData: IDanhMucCanBo = {
  id: 26357,
};

export const sampleWithPartialData: IDanhMucCanBo = {
  id: 3072,
  tenCanBo: 'crossly constitute once',
  diaChi: 'tame boo',
  namSinh: dayjs('2024-07-16'),
  email: 'ThieuCuong69@yahoo.com',
  soCmnd: 'unhitch upside-down',
  tenDangNhap: 'pfft gosh huzzah',
  clientId: 'off broiler always',
  usernameKyso: 'oof bah',
};

export const sampleWithFullData: IDanhMucCanBo = {
  id: 29697,
  idCanBo: 3305,
  tenCanBo: 'consequently',
  diaChi: 'twine',
  namSinh: dayjs('2024-07-16'),
  email: 'KhaiTuan_7kang@hotmail.com',
  soDienThoai: 'than',
  soCmnd: 'across hmph',
  tenDangNhap: 'discontinue bah',
  matKhau: 'aw',
  trangThai: 17369,
  clientId: 'than inauguration con',
  clientSecret: 'correctly',
  usernameKyso: 'stain known',
  passwordKyso: 'including times sometimes',
};

export const sampleWithNewData: NewDanhMucCanBo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
