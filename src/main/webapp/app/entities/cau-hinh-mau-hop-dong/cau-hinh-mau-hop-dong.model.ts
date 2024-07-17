import dayjs from 'dayjs/esm';
import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';
import { IPhanLoaiHopDong } from 'app/entities/phan-loai-hop-dong/phan-loai-hop-dong.model';

export interface ICauHinhMauHopDong {
  id: number;
  idLoaiHd?: number | null;
  dienGiai?: string | null;
  idVaiTro1?: number | null;
  idVaiTro2?: number | null;
  fileHopDong?: string | null;
  srcHopDong?: string | null;
  dieuKhoan?: string | null;
  idDonVi?: number | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  srcLoiChung?: string | null;
  idNhom?: number | null;
  fileLoiChung?: string | null;
  chuyenTaiSan?: number | null;
  loaiSuaDoi?: number | null;
  loaiHuyBo?: number | null;
  trangThaiDuyet?: number | null;
  idPhanLoaiHopDong?: number | null;
  srcCv?: string | null;
  srcTb?: string | null;
  srcTtpc?: string | null;
  idVaiTro3?: number | null;
  idLoaiHD?: Pick<IDanhMucLoaiHopDong, 'id'> | null;
  idPhanLoaiHD?: Pick<IPhanLoaiHopDong, 'id'> | null;
}

export type NewCauHinhMauHopDong = Omit<ICauHinhMauHopDong, 'id'> & { id: null };
