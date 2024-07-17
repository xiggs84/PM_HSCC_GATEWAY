import dayjs from 'dayjs/esm';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';
import { ITinhTrangTaiSan } from 'app/entities/tinh-trang-tai-san/tinh-trang-tai-san.model';

export interface ITaiSan {
  id: number;
  idTaiSan?: number | null;
  tenTaiSan?: string | null;
  trangThai?: number | null;
  thongTinTs?: string | null;
  ghiChu?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDuongSu?: number | null;
  idTsGoc?: number | null;
  maTaiSan?: string | null;
  idLoaiNganChan?: number | null;
  ngayBdNganChan?: dayjs.Dayjs | null;
  ngayKtNganChan?: dayjs.Dayjs | null;
  idMaster?: number | null;
  strSearch?: string | null;
  idDonVi?: number | null;
  soHsCv?: number | null;
  soCc?: number | null;
  soVaoSo?: number | null;
  moTa?: string | null;
  loaiNganChan?: number | null;
  syncStatus?: number | null;
  idTsGocs?: Pick<ITaiSan, 'id'>[] | null;
  idLoaiTs?: Pick<IDanhMucLoaiTaiSan, 'id'> | null;
  idTinhTrang?: Pick<ITinhTrangTaiSan, 'id'> | null;
  taiSans?: Pick<ITaiSan, 'id'>[] | null;
}

export type NewTaiSan = Omit<ITaiSan, 'id'> & { id: null };
