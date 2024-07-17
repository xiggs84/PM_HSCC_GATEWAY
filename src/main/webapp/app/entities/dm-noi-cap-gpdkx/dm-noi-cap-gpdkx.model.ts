export interface IDmNoiCapGpdkx {
  id: number;
  idNoiCap?: number | null;
  dienGiai?: string | null;
  idDonVi?: number | null;
  trangThai?: number | null;
}

export type NewDmNoiCapGpdkx = Omit<IDmNoiCapGpdkx, 'id'> & { id: null };
