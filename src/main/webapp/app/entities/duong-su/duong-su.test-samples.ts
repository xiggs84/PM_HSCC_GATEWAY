import dayjs from 'dayjs/esm';

import { IDuongSu, NewDuongSu } from './duong-su.model';

export const sampleWithRequiredData: IDuongSu = {
  id: 21175,
};

export const sampleWithPartialData: IDuongSu = {
  id: 19559,
  idDuongSu: 6850,
  tenDuongSu: 'betray gadget',
  trangThai: 32732,
  thongTinDs: 'scaly look',
  idDsGoc: 5229,
  idDonVi: 28694,
};

export const sampleWithFullData: IDuongSu = {
  id: 19536,
  idDuongSu: 23894,
  tenDuongSu: 'keep afore',
  diaChi: 'clump breathe indeed',
  trangThai: 13051,
  thongTinDs: 'whose upward',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 25689,
  idDsGoc: 19985,
  idMaster: 'silently',
  idDonVi: 1162,
  strSearch: 'daily till on',
  soGiayTo: 'adobe cull',
  idLoaiNganChan: 7231,
  syncStatus: 19877,
};

export const sampleWithNewData: NewDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
