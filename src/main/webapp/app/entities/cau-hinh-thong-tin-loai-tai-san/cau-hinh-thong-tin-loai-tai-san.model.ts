export interface ICauHinhThongTinLoaiTaiSan {
  id: number;
  idCauHinh?: number | null;
  noiDung?: string | null;
  javascript?: string | null;
  css?: string | null;
  idLoaiTs?: number | null;
  idDonVi?: number | null;
  trangThai?: number | null;
  xml?: string | null;
}

export type NewCauHinhThongTinLoaiTaiSan = Omit<ICauHinhThongTinLoaiTaiSan, 'id'> & { id: null };
