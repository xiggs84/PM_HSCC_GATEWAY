export interface IFileidDrive {
  id: number;
  fileId?: string | null;
  trangThai?: number | null;
  idHopDong?: number | null;
}

export type NewFileidDrive = Omit<IFileidDrive, 'id'> & { id: null };
