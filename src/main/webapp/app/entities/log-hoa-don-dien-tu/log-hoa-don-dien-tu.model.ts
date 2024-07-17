import dayjs from 'dayjs/esm';

export interface ILogHoaDonDienTu {
  id: number;
  idDonVi?: number | null;
  idHopDong?: number | null;
  fKey?: string | null;
  ketQua?: string | null;
  trangThai?: number | null;
  ngayPhatHanh?: dayjs.Dayjs | null;
}

export type NewLogHoaDonDienTu = Omit<ILogHoaDonDienTu, 'id'> & { id: null };
