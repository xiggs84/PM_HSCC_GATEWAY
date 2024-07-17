export interface IDanhMucLoaiSoCongChung {
  id: number;
  idLoai?: number | null;
  tenLoai?: string | null;
  trangThai?: number | null;
}

export type NewDanhMucLoaiSoCongChung = Omit<IDanhMucLoaiSoCongChung, 'id'> & { id: null };
