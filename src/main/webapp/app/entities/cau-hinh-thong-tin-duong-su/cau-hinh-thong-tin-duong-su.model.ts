export interface ICauHinhThongTinDuongSu {
  id: number;
  idCauHinh?: number | null;
  noiDung?: string | null;
  javascript?: string | null;
  css?: string | null;
  idLoaiDs?: number | null;
  idDonVi?: number | null;
  trangThai?: number | null;
}

export type NewCauHinhThongTinDuongSu = Omit<ICauHinhThongTinDuongSu, 'id'> & { id: null };
