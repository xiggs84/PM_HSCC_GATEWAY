export interface ITinhTrangDuongSu {
  id: number;
  idTinhTrang?: number | null;
  dienGiai?: string | null;
  idLoaiDs?: number | null;
}

export type NewTinhTrangDuongSu = Omit<ITinhTrangDuongSu, 'id'> & { id: null };
