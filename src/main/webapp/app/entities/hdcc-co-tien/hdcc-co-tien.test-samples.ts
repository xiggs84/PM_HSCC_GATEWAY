import { IHdccCoTien, NewHdccCoTien } from './hdcc-co-tien.model';

export const sampleWithRequiredData: IHdccCoTien = {
  id: 3108,
};

export const sampleWithPartialData: IHdccCoTien = {
  id: 21783,
  idMaster: 5921,
  soTienRutTrich: 14120,
};

export const sampleWithFullData: IHdccCoTien = {
  id: 25607,
  idMaster: 5584,
  soCongChung: 11913,
  soTienRutTrich: 19421,
};

export const sampleWithNewData: NewHdccCoTien = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
