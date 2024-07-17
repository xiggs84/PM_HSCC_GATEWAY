export interface IDanhMucTinhTrangHonNhan {
  id: number;
  idTinhTrang?: number | null;
  dienGiai?: string | null;
  trangThai?: number | null;
}

export type NewDanhMucTinhTrangHonNhan = Omit<IDanhMucTinhTrangHonNhan, 'id'> & { id: null };
