export interface IDanhMucLoaiTaiSan {
  id: number;
  idLoaiTs?: number | null;
  dienGiai?: string | null;
  trangThai?: number | null;
  searchStr?: string | null;
}

export type NewDanhMucLoaiTaiSan = Omit<IDanhMucLoaiTaiSan, 'id'> & { id: null };
