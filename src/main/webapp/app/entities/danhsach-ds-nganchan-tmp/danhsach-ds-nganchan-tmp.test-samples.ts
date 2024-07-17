import dayjs from 'dayjs/esm';

import { IDanhsachDsNganchanTmp, NewDanhsachDsNganchanTmp } from './danhsach-ds-nganchan-tmp.model';

export const sampleWithRequiredData: IDanhsachDsNganchanTmp = {
  id: 18267,
};

export const sampleWithPartialData: IDanhsachDsNganchanTmp = {
  id: 23897,
  idDoiTuong: 7262,
  ngayNganChan: dayjs('2024-07-16'),
  soCc: 'opposite above',
  soVaoSo: 'behind plus',
  loaiDoiTuong: 2938,
};

export const sampleWithFullData: IDanhsachDsNganchanTmp = {
  id: 16458,
  idDoiTuong: 4012,
  ngayNganChan: dayjs('2024-07-16'),
  soHsCv: 'anxiously',
  soCc: 'seriously malinger yet',
  soVaoSo: 'brr usually quickly',
  moTa: 'gah',
  idDoituongGoc: 6699,
  loaiNganChan: 7286,
  loaiDoiTuong: 9016,
};

export const sampleWithNewData: NewDanhsachDsNganchanTmp = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
