export interface IDanhMucDichVu {
  id: number;
  dienGiai?: string | null;
  donViTinh?: string | null;
  donGia?: number | null;
  idDichVu?: number | null;
}

export type NewDanhMucDichVu = Omit<IDanhMucDichVu, 'id'> & { id: null };
