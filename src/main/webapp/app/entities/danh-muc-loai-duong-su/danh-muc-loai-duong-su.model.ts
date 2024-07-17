export interface IDanhMucLoaiDuongSu {
  id: number;
  idLoaiDs?: number | null;
  dienGiai?: string | null;
  trangThai?: number | null;
  strSearch?: string | null;
}

export type NewDanhMucLoaiDuongSu = Omit<IDanhMucLoaiDuongSu, 'id'> & { id: null };
