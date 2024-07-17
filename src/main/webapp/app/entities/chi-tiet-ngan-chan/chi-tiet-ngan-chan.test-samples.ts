import dayjs from 'dayjs/esm';

import { IChiTietNganChan, NewChiTietNganChan } from './chi-tiet-ngan-chan.model';

export const sampleWithRequiredData: IChiTietNganChan = {
  id: 27148,
};

export const sampleWithPartialData: IChiTietNganChan = {
  id: 17552,
  ngayThaoTac: dayjs('2024-07-16'),
  loaiDoiTuong: 10594,
  soVaoSo: 'efficiency',
};

export const sampleWithFullData: IChiTietNganChan = {
  id: 29187,
  stt: 11024,
  idDoiTuong: 30320,
  ngayThaoTac: dayjs('2024-07-16'),
  loaiDoiTuong: 28205,
  soHsCv: 'frankly bountiful under',
  soCc: 'if',
  soVaoSo: 'because',
  moTa: 'qua',
  ngayNganChan: dayjs('2024-07-16'),
  ngayBdNganChan: dayjs('2024-07-16'),
  ngayKtNganChan: dayjs('2024-07-17'),
  trangThai: 29346,
  nguoiThaoTac: 31882,
  loaiNganChan: 32551,
  ngayCongVan: dayjs('2024-07-16'),
};

export const sampleWithNewData: NewChiTietNganChan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
