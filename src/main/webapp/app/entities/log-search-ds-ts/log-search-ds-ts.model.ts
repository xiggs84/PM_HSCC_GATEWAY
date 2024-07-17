import dayjs from 'dayjs/esm';

export interface ILogSearchDsTs {
  id: number;
  idLog?: number | null;
  nguoiThaoTac?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  noiDung?: string | null;
  slKq?: number | null;
  kqSearch?: string | null;
}

export type NewLogSearchDsTs = Omit<ILogSearchDsTs, 'id'> & { id: null };
