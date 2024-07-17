export interface IPhanLoaiHopDong {
  id: number;
  idPhanLoaiHopDong?: number | null;
  dienGiai?: string | null;
}

export type NewPhanLoaiHopDong = Omit<IPhanLoaiHopDong, 'id'> & { id: null };
