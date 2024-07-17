import { IMenu, NewMenu } from './menu.model';

export const sampleWithRequiredData: IMenu = {
  id: 18942,
};

export const sampleWithPartialData: IMenu = {
  id: 31338,
  idMenu: 6723,
  tenMenu: 'misquote unlike gigantic',
  idMenuCha: 23676,
  stt: 25836,
  trangThai: 32725,
  idLoaiMenu: 6853,
};

export const sampleWithFullData: IMenu = {
  id: 11127,
  idMenu: 19207,
  tenMenu: 'pavement but',
  idMenuCha: 16282,
  path: 'monster',
  icon: 'tan outside by',
  stt: 7334,
  trangThai: 22874,
  idLoaiMenu: 18722,
};

export const sampleWithNewData: NewMenu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
