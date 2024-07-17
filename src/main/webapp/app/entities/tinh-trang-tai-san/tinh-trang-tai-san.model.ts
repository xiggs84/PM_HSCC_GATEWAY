export interface ITinhTrangTaiSan {
  id: number;
  idTinhTrang?: number | null;
  dienGiai?: string | null;
  trangThai?: number | null;
}

export type NewTinhTrangTaiSan = Omit<ITinhTrangTaiSan, 'id'> & { id: null };
