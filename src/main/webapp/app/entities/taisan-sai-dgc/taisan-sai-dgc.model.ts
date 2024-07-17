export interface ITaisanSaiDgc {
  id: number;
  idMaster?: number | null;
  thongTinTs?: string | null;
  thongTinTsDung?: string | null;
}

export type NewTaisanSaiDgc = Omit<ITaisanSaiDgc, 'id'> & { id: null };
