export interface IThuaTach {
  id: number;
  idThuaTach?: number | null;
  idTaiSan?: number | null;
  thongTinThuaTach?: string | null;
  trangThai?: number | null;
}

export type NewThuaTach = Omit<IThuaTach, 'id'> & { id: null };
