import dayjs from 'dayjs/esm';

export interface ILogDownloadFileDrive {
  id: number;
  idLog?: number | null;
  noiDung?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  key?: number | null;
}

export type NewLogDownloadFileDrive = Omit<ILogDownloadFileDrive, 'id'> & { id: null };
