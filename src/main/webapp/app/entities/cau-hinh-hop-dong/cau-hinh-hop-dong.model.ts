export interface ICauHinhHopDong {
  id: number;
  idLoaiHopDong?: number | null;
  idDonVi?: number | null;
  chieuDai?: number | null;
  tienTo?: string | null;
  giaTri?: number | null;
  hienThi?: string | null;
  trangThai?: number | null;
}

export type NewCauHinhHopDong = Omit<ICauHinhHopDong, 'id'> & { id: null };
