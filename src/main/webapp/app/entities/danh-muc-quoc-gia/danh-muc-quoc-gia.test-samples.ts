import { IDanhMucQuocGia, NewDanhMucQuocGia } from './danh-muc-quoc-gia.model';

export const sampleWithRequiredData: IDanhMucQuocGia = {
  id: 2,
};

export const sampleWithPartialData: IDanhMucQuocGia = {
  id: 30701,
  tenTiengAnh: 'frightfully on off',
};

export const sampleWithFullData: IDanhMucQuocGia = {
  id: 5467,
  idQuocGia: 14303,
  tenQuocGia: 'yuck soda',
  tenTiengAnh: 'marshmallow',
};

export const sampleWithNewData: NewDanhMucQuocGia = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
