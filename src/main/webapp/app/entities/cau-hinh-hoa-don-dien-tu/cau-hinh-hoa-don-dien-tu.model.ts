import dayjs from 'dayjs/esm';

export interface ICauHinhHoaDonDienTu {
  id: number;
  idDonVi?: number | null;
  apiUrl?: string | null;
  account?: string | null;
  accPass?: string | null;
  username?: string | null;
  password?: string | null;
  mauSo?: string | null;
  kyHieu?: string | null;
  nguoiThaoTac?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
}

export type NewCauHinhHoaDonDienTu = Omit<ICauHinhHoaDonDienTu, 'id'> & { id: null };
