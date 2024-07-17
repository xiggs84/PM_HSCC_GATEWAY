import dayjs from 'dayjs/esm';

export interface IVanBan {
  id: number;
  idVanBan?: number | null;
  dienGiai?: string | null;
  tenFile?: string | null;
  srcFile?: string | null;
  idLoaiVb?: number | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDonVi?: number | null;
  idVbGoc?: number | null;
}

export type NewVanBan = Omit<IVanBan, 'id'> & { id: null };
