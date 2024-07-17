import { ITaisanSaiDgc, NewTaisanSaiDgc } from './taisan-sai-dgc.model';

export const sampleWithRequiredData: ITaisanSaiDgc = {
  id: 26018,
};

export const sampleWithPartialData: ITaisanSaiDgc = {
  id: 23282,
  thongTinTsDung: 'finally',
};

export const sampleWithFullData: ITaisanSaiDgc = {
  id: 25586,
  idMaster: 2275,
  thongTinTs: 'line',
  thongTinTsDung: 'provided',
};

export const sampleWithNewData: NewTaisanSaiDgc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
