export interface IHdMasterTcCoCcv {
  id: number;
  repRefUnique?: number | null;
  persCode?: number | null;
  tenCanBo?: string | null;
  idCanBo?: number | null;
}

export type NewHdMasterTcCoCcv = Omit<IHdMasterTcCoCcv, 'id'> & { id: null };
