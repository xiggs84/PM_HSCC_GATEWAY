import dayjs from 'dayjs/esm';

export interface IDanhMucLoaiHopDong {
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
  dgTen?: string | null;
  nhomTen?: number | null;
  idVaiTro3?: number | null;
}

export type NewDanhMucLoaiHopDong = Omit<IDanhMucLoaiHopDong, 'id'> & { id: null };
