export interface ITaisannhadatid {
  id: number;
  idTaiSan?: number | null;
  thongTinTs?: string | null;
}

export type NewTaisannhadatid = Omit<ITaisannhadatid, 'id'> & { id: null };
