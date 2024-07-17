export interface IDanhMucTinh {
  id: number;
  maTinh?: number | null;
  tenTinh?: string | null;
  trangThai?: number | null;
}

export type NewDanhMucTinh = Omit<IDanhMucTinh, 'id'> & { id: null };
