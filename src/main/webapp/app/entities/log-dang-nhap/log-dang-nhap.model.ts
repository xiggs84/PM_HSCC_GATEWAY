import dayjs from 'dayjs/esm';

export interface ILogDangNhap {
  id: number;
  ngayDangNhap?: dayjs.Dayjs | null;
  ipAddress?: string | null;
  idCanBo?: number | null;
  tenDangNhap?: string | null;
}

export type NewLogDangNhap = Omit<ILogDangNhap, 'id'> & { id: null };
