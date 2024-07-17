import dayjs from 'dayjs/esm';

export interface IDanhMucTuVietTat {
  id: number;
  idVietTat?: number | null;
  tuVietTat?: string | null;
  dienGiai?: string | null;
  idDonVi?: number | null;
  nguoiThaoTac?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  trangThai?: number | null;
}

export type NewDanhMucTuVietTat = Omit<IDanhMucTuVietTat, 'id'> & { id: null };
