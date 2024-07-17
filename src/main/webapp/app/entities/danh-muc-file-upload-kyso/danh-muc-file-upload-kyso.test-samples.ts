import dayjs from 'dayjs/esm';

import { IDanhMucFileUploadKyso, NewDanhMucFileUploadKyso } from './danh-muc-file-upload-kyso.model';

export const sampleWithRequiredData: IDanhMucFileUploadKyso = {
  id: 3165,
};

export const sampleWithPartialData: IDanhMucFileUploadKyso = {
  id: 4812,
  idFile: 2091,
  fileUrl: 'deafen',
  idCanBo: 11864,
  idDonVi: 836,
  ngayThaoTac: dayjs('2024-07-16T10:57'),
  filePdfUrl: 'geez maunder forbear',
};

export const sampleWithFullData: IDanhMucFileUploadKyso = {
  id: 15313,
  idFile: 23070,
  tenFile: 'divorce considering off',
  fileUrl: 'tremendously honorable barbeque',
  fileSignedUrl: 'underneath',
  idCanBo: 11293,
  idDonVi: 13435,
  ngayThaoTac: dayjs('2024-07-17T02:43'),
  trangThai: 31973,
  filePdfUrl: 'crown loosely yowza',
};

export const sampleWithNewData: NewDanhMucFileUploadKyso = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
