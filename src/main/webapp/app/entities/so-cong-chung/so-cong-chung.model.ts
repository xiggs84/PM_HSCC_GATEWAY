import dayjs from 'dayjs/esm';

export interface ISoCongChung {
  id: number;
  ngayThaoTac?: dayjs.Dayjs | null;
  idSo?: number | null;
  idDonVi?: number | null;
  tenSo?: string | null;
  giaTri?: number | null;
  nguoiThaoTac?: number | null;
  trangThai?: number | null;
  idLoaiSo?: number | null;
}

export type NewSoCongChung = Omit<ISoCongChung, 'id'> & { id: null };
