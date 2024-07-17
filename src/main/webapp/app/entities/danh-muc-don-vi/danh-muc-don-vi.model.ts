import dayjs from 'dayjs/esm';
import { IDanhMucTinh } from 'app/entities/danh-muc-tinh/danh-muc-tinh.model';
import { IDanhMucHuyen } from 'app/entities/danh-muc-huyen/danh-muc-huyen.model';
import { IDanhMucXa } from 'app/entities/danh-muc-xa/danh-muc-xa.model';
import { IDanhMucLoaiDonVi } from 'app/entities/danh-muc-loai-don-vi/danh-muc-loai-don-vi.model';

export interface IDanhMucDonVi {
  id: number;
  idDonVi?: number | null;
  tenDonVi?: string | null;
  diaChi?: string | null;
  nguoiDaiDien?: string | null;
  soDienThoai?: string | null;
  idDonViQl?: number | null;
  loaiDonVi?: number | null;
  ngayKhaiBao?: dayjs.Dayjs | null;
  trangThai?: number | null;
  soNha?: string | null;
  maSoThue?: string | null;
  idCapQl?: number | null;
  loaiNhiemVu?: number | null;
  hoaDonDt?: number | null;
  maDonViIgate?: string | null;
  maCoQuanIgate?: string | null;
  capDonVi?: number | null;
  kySo?: number | null;
  qrScan?: number | null;
  verifyIdCard?: number | null;
  isVerifyFace?: number | null;
  isElastic?: number | null;
  apikeyCccd?: string | null;
  apikeyFace?: string | null;
  verifyCodeCccd?: string | null;
  usernameElastic?: string | null;
  passwordElastic?: string | null;
  idTinh?: Pick<IDanhMucTinh, 'id'> | null;
  idHuyen?: Pick<IDanhMucHuyen, 'id'> | null;
  idPhuongXa?: Pick<IDanhMucXa, 'id'> | null;
  idLoaiDv?: Pick<IDanhMucLoaiDonVi, 'id'> | null;
}

export type NewDanhMucDonVi = Omit<IDanhMucDonVi, 'id'> & { id: null };
