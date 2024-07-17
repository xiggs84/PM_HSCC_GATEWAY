export interface ISoHuuTheo {
  id: number;
  idSoHuu?: number | null;
  dienGiai?: string | null;
  tenGcn?: string | null;
}

export type NewSoHuuTheo = Omit<ISoHuuTheo, 'id'> & { id: null };
