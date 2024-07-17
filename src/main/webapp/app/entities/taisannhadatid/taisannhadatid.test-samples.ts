import { ITaisannhadatid, NewTaisannhadatid } from './taisannhadatid.model';

export const sampleWithRequiredData: ITaisannhadatid = {
  id: 2602,
};

export const sampleWithPartialData: ITaisannhadatid = {
  id: 26253,
  idTaiSan: 22812,
};

export const sampleWithFullData: ITaisannhadatid = {
  id: 20062,
  idTaiSan: 30860,
  thongTinTs: 'since dinner',
};

export const sampleWithNewData: NewTaisannhadatid = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
