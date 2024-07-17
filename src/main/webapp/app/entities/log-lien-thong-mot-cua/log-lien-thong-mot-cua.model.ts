import dayjs from 'dayjs/esm';

export interface ILogLienThongMotCua {
  id: number;
  idLog?: number | null;
  idChungThuc?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  noiDung?: string | null;
}

export type NewLogLienThongMotCua = Omit<ILogLienThongMotCua, 'id'> & { id: null };
