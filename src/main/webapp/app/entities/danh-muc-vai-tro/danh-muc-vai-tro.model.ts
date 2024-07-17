export interface IDanhMucVaiTro {
  id: number;
  idVaiTro?: number | null;
  dienGiai?: string | null;
  idLoaiHopDong?: number | null;
  idLoaiVaiTro?: number | null;
}

export type NewDanhMucVaiTro = Omit<IDanhMucVaiTro, 'id'> & { id: null };
