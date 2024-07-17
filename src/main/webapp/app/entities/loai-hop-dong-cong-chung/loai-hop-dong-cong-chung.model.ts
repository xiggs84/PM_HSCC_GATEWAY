export interface ILoaiHopDongCongChung {
  id: number;
  idLoaiHopDongCongChung?: number | null;
  dienGiai?: string | null;
  giaTri?: number | null;
  trangThai?: number | null;
}

export type NewLoaiHopDongCongChung = Omit<ILoaiHopDongCongChung, 'id'> & { id: null };
