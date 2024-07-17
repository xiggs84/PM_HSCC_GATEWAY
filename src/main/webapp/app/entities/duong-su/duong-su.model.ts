import dayjs from 'dayjs/esm';
import { IDanhMucTinhTrangHonNhan } from 'app/entities/danh-muc-tinh-trang-hon-nhan/danh-muc-tinh-trang-hon-nhan.model';
import { IDanhMucLoaiDuongSu } from 'app/entities/danh-muc-loai-duong-su/danh-muc-loai-duong-su.model';

export interface IDuongSu {
  id: number;
  idDuongSu?: number | null;
  tenDuongSu?: string | null;
  diaChi?: string | null;
  trangThai?: number | null;
  thongTinDs?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDsGoc?: number | null;
  idMaster?: string | null;
  idDonVi?: number | null;
  strSearch?: string | null;
  soGiayTo?: string | null;
  idLoaiNganChan?: number | null;
  syncStatus?: number | null;
  idTinhTrang?: Pick<IDanhMucTinhTrangHonNhan, 'id'> | null;
  idLoaiDs?: Pick<IDanhMucLoaiDuongSu, 'id'> | null;
}

export type NewDuongSu = Omit<IDuongSu, 'id'> & { id: null };
