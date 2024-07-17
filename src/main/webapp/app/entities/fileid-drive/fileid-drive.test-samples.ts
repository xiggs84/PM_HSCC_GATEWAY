import { IFileidDrive, NewFileidDrive } from './fileid-drive.model';

export const sampleWithRequiredData: IFileidDrive = {
  id: 14796,
};

export const sampleWithPartialData: IFileidDrive = {
  id: 20709,
  fileId: 'regarding sharp before',
  trangThai: 14347,
  idHopDong: 16876,
};

export const sampleWithFullData: IFileidDrive = {
  id: 27914,
  fileId: 'storey bark',
  trangThai: 20109,
  idHopDong: 8610,
};

export const sampleWithNewData: NewFileidDrive = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
