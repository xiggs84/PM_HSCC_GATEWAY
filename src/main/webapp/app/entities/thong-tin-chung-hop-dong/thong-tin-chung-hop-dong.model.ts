import dayjs from 'dayjs/esm';
import { IHopDongCongChung } from 'app/entities/hop-dong-cong-chung/hop-dong-cong-chung.model';
import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { ISoCongChung } from 'app/entities/so-cong-chung/so-cong-chung.model';

export interface IThongTinChungHopDong {
  id: number;
  ngayLapHd?: dayjs.Dayjs | null;
  nguoiLapHd?: number | null;
  thongTinVanBan?: string | null;
  trangThai?: number | null;
  idLoaiHd?: number | null;
  dieuKhoanHd?: string | null;
  idDonVi?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idHdGoc?: number | null;
  maHopDong?: string | null;
  srcHopDong?: string | null;
  ngayHen?: dayjs.Dayjs | null;
  soCongChung?: number | null;
  congChungVien?: number | null;
  ngayKyHd?: dayjs.Dayjs | null;
  nguoiRutTrich?: number | null;
  soTienRutTrich?: number | null;
  ngayRutTrich?: dayjs.Dayjs | null;
  hdThuCong?: number | null;
  trangThaiRutTrich?: number | null;
  chuKyNgoaiTruSo?: number | null;
  strSearch?: string | null;
  idMaster?: number | null;
  idHdSdHb?: number | null;
  srcDmMaster?: string | null;
  repRefUnique?: number | null;
  ngayText?: string | null;
  thongTinChung?: string | null;
  thongTinChungClob?: string | null;
  idHopDong?: Pick<IHopDongCongChung, 'id'> | null;
  idLoaiHD?: Pick<IDanhMucLoaiHopDong, 'id'> | null;
  idSoCongChung?: Pick<ISoCongChung, 'id'> | null;
}

export type NewThongTinChungHopDong = Omit<IThongTinChungHopDong, 'id'> & { id: null };
