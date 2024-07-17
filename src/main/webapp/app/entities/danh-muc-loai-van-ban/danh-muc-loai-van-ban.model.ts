export interface IDanhMucLoaiVanBan {
  id: number;
  idLoaiVb?: number | null;
  dienGiai?: string | null;
  idLoaiHopDong?: number | null;
}

export type NewDanhMucLoaiVanBan = Omit<IDanhMucLoaiVanBan, 'id'> & { id: null };
