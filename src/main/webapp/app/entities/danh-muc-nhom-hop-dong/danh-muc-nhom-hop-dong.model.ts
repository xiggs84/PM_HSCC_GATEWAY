export interface IDanhMucNhomHopDong {
  id: number;
  idNhom?: number | null;
  dienGiai?: string | null;
}

export type NewDanhMucNhomHopDong = Omit<IDanhMucNhomHopDong, 'id'> & { id: null };
