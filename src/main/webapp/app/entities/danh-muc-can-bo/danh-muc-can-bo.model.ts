import dayjs from 'dayjs/esm';

export interface IDanhMucCanBo {
  id: number;
  idCanBo?: number | null;
  tenCanBo?: string | null;
  diaChi?: string | null;
  namSinh?: dayjs.Dayjs | null;
  email?: string | null;
  soDienThoai?: string | null;
  soCmnd?: string | null;
  tenDangNhap?: string | null;
  matKhau?: string | null;
  trangThai?: number | null;
  clientId?: string | null;
  clientSecret?: string | null;
  usernameKyso?: string | null;
  passwordKyso?: string | null;
}

export type NewDanhMucCanBo = Omit<IDanhMucCanBo, 'id'> & { id: null };
