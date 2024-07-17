import { IUserOnline, NewUserOnline } from './user-online.model';

export const sampleWithRequiredData: IUserOnline = {
  id: 8511,
};

export const sampleWithPartialData: IUserOnline = {
  id: 27619,
  sessionId: 'anguish',
  time: 6545,
  browser: 'nougat to whenever',
};

export const sampleWithFullData: IUserOnline = {
  id: 8497,
  sessionId: 'whoa mmm',
  time: 9952,
  browser: 'though gee',
};

export const sampleWithNewData: NewUserOnline = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
