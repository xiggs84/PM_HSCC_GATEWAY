export interface IDanhMucNoiCapQsh {
  id: number;
  idNoiCap?: number | null;
  dienGiai?: string | null;
  idDonVi?: number | null;
}

export type NewDanhMucNoiCapQsh = Omit<IDanhMucNoiCapQsh, 'id'> & { id: null };
