export interface INoiCapGttt {
  id: number;
  idNoiCap?: number | null;
  dienGiai?: string | null;
  idDonVi?: number | null;
  trangThai?: number | null;
}

export type NewNoiCapGttt = Omit<INoiCapGttt, 'id'> & { id: null };
