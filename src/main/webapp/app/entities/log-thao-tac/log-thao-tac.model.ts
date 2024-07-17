import dayjs from 'dayjs/esm';

export interface ILogThaoTac {
  id: number;
  idLog?: number | null;
  dienGiai?: string | null;
  tenBang?: string | null;
  idKhoa?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
}

export type NewLogThaoTac = Omit<ILogThaoTac, 'id'> & { id: null };
