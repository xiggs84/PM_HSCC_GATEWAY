import { IHdMasterTcCoCcv, NewHdMasterTcCoCcv } from './hd-master-tc-co-ccv.model';

export const sampleWithRequiredData: IHdMasterTcCoCcv = {
  id: 14538,
};

export const sampleWithPartialData: IHdMasterTcCoCcv = {
  id: 3091,
  repRefUnique: 23327,
  tenCanBo: 'nor',
  idCanBo: 3755,
};

export const sampleWithFullData: IHdMasterTcCoCcv = {
  id: 14461,
  repRefUnique: 32697,
  persCode: 26838,
  tenCanBo: 'or who apud',
  idCanBo: 21919,
};

export const sampleWithNewData: NewHdMasterTcCoCcv = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
