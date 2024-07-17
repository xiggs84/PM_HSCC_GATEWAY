export interface IMenu {
  id: number;
  idMenu?: number | null;
  tenMenu?: string | null;
  idMenuCha?: number | null;
  path?: string | null;
  icon?: string | null;
  stt?: number | null;
  trangThai?: number | null;
  idLoaiMenu?: number | null;
}

export type NewMenu = Omit<IMenu, 'id'> & { id: null };
