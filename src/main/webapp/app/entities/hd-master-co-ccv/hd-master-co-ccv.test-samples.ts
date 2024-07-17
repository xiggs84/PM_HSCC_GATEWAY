import { IHdMasterCoCcv, NewHdMasterCoCcv } from './hd-master-co-ccv.model';

export const sampleWithRequiredData: IHdMasterCoCcv = {
  id: 13483,
};

export const sampleWithPartialData: IHdMasterCoCcv = {
  id: 17689,
  repRefUnique: 8119,
  tenCanBo: 'discrepancy',
  idCanBo: 18164,
};

export const sampleWithFullData: IHdMasterCoCcv = {
  id: 13932,
  repRefUnique: 3665,
  persCode: 5560,
  ldUnique: 29759,
  tenCanBo: 'platypus phew',
  idCanBo: 16728,
};

export const sampleWithNewData: NewHdMasterCoCcv = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
