export interface IHdMasterCoCcv {
  id: number;
  repRefUnique?: number | null;
  persCode?: number | null;
  ldUnique?: number | null;
  tenCanBo?: string | null;
  idCanBo?: number | null;
}

export type NewHdMasterCoCcv = Omit<IHdMasterCoCcv, 'id'> & { id: null };
