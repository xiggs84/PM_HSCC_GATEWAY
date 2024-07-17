import { IDanhMucDauSoCmnd, NewDanhMucDauSoCmnd } from './danh-muc-dau-so-cmnd.model';

export const sampleWithRequiredData: IDanhMucDauSoCmnd = {
  id: 6369,
};

export const sampleWithPartialData: IDanhMucDauSoCmnd = {
  id: 14486,
  tinhThanh: 'previous around',
  idLoai: 13513,
};

export const sampleWithFullData: IDanhMucDauSoCmnd = {
  id: 188,
  idDauSo: 3462,
  dauSo: 'harvester macadamia',
  tinhThanh: 'working capitalism transfuse',
  idLoai: 7483,
};

export const sampleWithNewData: NewDanhMucDauSoCmnd = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
