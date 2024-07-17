import dayjs from 'dayjs/esm';

import { IDanhSachDuongSu, NewDanhSachDuongSu } from './danh-sach-duong-su.model';

export const sampleWithRequiredData: IDanhSachDuongSu = {
  id: 1211,
};

export const sampleWithPartialData: IDanhSachDuongSu = {
  id: 30409,
  tenDuongSu: 'age configuration briskly',
  idLoaiDs: 1048,
  diaChi: 'incarcerate what rampage',
  trangThai: 7309,
  idTinhTrang: 21502,
  idMaster: 'yieldingly apostrophize',
  idDonVi: 27987,
};

export const sampleWithFullData: IDanhSachDuongSu = {
  id: 23449,
  idDuongSu: 11810,
  tenDuongSu: 'signify mmm gratefully',
  idLoaiDs: 24503,
  diaChi: 'gah cautiously traumatize',
  trangThai: 30217,
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 25527,
  idDsGoc: 22463,
  idTinhTrang: 30606,
  idMaster: 'ornery deter',
  idDonVi: 1943,
  strSearch: 'fooey ouch',
  soGiayTo: 'consequently dialect afterwards',
  idLoaiNganChan: 20014,
};

export const sampleWithNewData: NewDanhSachDuongSu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
