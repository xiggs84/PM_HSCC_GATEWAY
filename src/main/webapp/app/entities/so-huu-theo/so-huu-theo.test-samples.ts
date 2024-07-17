import { ISoHuuTheo, NewSoHuuTheo } from './so-huu-theo.model';

export const sampleWithRequiredData: ISoHuuTheo = {
  id: 7572,
};

export const sampleWithPartialData: ISoHuuTheo = {
  id: 8053,
  idSoHuu: 25353,
  tenGcn: 'turbulent storm instruction',
};

export const sampleWithFullData: ISoHuuTheo = {
  id: 16941,
  idSoHuu: 4632,
  dienGiai: 'only till pish',
  tenGcn: 'effect boldly bulky',
};

export const sampleWithNewData: NewSoHuuTheo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
