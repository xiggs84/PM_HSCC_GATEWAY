import dayjs from 'dayjs/esm';

import { IDuongSuTrungCmnd, NewDuongSuTrungCmnd } from './duong-su-trung-cmnd.model';

export const sampleWithRequiredData: IDuongSuTrungCmnd = {
  id: 13856,
};

export const sampleWithPartialData: IDuongSuTrungCmnd = {
  id: 9137,
  tenDuongSu: 'haversack bravely',
  idLoaiDs: 27786,
  diaChi: 'toward',
  trangThai: 18172,
  thongTinDs: 'leash stain realization',
  idMaster: 'nearly',
  soGiayTo: 'bleakly pfft likewise',
  idMasterMin: 31859,
  idDuongSuMax: 24644,
};

export const sampleWithFullData: IDuongSuTrungCmnd = {
  id: 22141,
  idDuongSu: 20176,
  tenDuongSu: 'parade regal',
  idLoaiDs: 5209,
  diaChi: 'viciously',
  trangThai: 1901,
  thongTinDs: 'as',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 15240,
  idDsGoc: 10575,
  idTinhTrang: 12678,
  idMaster: 'edit',
  idDonVi: 16311,
  strSearch: 'like sift fickle',
  soGiayTo: 'rigidly',
  idDuongSuMin: 27766,
  idMasterMin: 2184,
  idDuongSuMax: 9214,
  idMasterMax: 12301,
};

export const sampleWithNewData: NewDuongSuTrungCmnd = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
