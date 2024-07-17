import dayjs from 'dayjs/esm';

import { ILogDownloadFileDrive, NewLogDownloadFileDrive } from './log-download-file-drive.model';

export const sampleWithRequiredData: ILogDownloadFileDrive = {
  id: 26745,
};

export const sampleWithPartialData: ILogDownloadFileDrive = {
  id: 9890,
};

export const sampleWithFullData: ILogDownloadFileDrive = {
  id: 18050,
  idLog: 15140,
  noiDung: 'amid amid whose',
  ngayThaoTac: dayjs('2024-07-16'),
  key: 20490,
};

export const sampleWithNewData: NewLogDownloadFileDrive = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
