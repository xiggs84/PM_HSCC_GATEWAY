import { IDanhMucHuyen } from 'app/entities/danh-muc-huyen/danh-muc-huyen.model';

export interface IDanhMucXa {
  id: number;
  maXa?: number | null;
  tenXa?: string | null;
  trangThai?: number | null;
  maHuyen?: Pick<IDanhMucHuyen, 'id'> | null;
}

export type NewDanhMucXa = Omit<IDanhMucXa, 'id'> & { id: null };
