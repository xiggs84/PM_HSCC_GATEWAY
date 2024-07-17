import dayjs from 'dayjs/esm';

export interface ILichSuGiaoDich {
  id: number;
  idTaiSan?: number | null;
  idDuongSu?: number | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  idHopDong?: number | null;
  idLoaiHopDong?: number | null;
  idChungThuc?: number | null;
}

export type NewLichSuGiaoDich = Omit<ILichSuGiaoDich, 'id'> & { id: null };
