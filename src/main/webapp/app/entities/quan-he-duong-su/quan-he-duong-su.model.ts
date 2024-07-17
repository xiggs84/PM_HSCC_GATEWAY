export interface IQuanHeDuongSu {
  id: number;
  idDuongSu?: number | null;
  idDuongSuQh?: number | null;
  idQuanHe?: number | null;
  thongTinQuanHe?: string | null;
  trangThai?: number | null;
}

export type NewQuanHeDuongSu = Omit<IQuanHeDuongSu, 'id'> & { id: null };
