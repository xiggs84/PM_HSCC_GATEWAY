import dayjs from 'dayjs/esm';

import { ILogThaoTac, NewLogThaoTac } from './log-thao-tac.model';

export const sampleWithRequiredData: ILogThaoTac = {
  id: 3313,
};

export const sampleWithPartialData: ILogThaoTac = {
  id: 20014,
  dienGiai: 'lest',
  idKhoa: 'rasterise',
  ngayThaoTac: dayjs('2024-07-16'),
};

export const sampleWithFullData: ILogThaoTac = {
  id: 25430,
  idLog: 32239,
  dienGiai: 'viciously trek forenenst',
  tenBang: 'up unripe beware',
  idKhoa: 'if',
  ngayThaoTac: dayjs('2024-07-16'),
  nguoiThaoTac: 11755,
};

export const sampleWithNewData: NewLogThaoTac = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
