import { IDanhMucTinh } from 'app/entities/danh-muc-tinh/danh-muc-tinh.model';

export interface IDanhMucHuyen {
  id: number;
  maHuyen?: number | null;
  tenHuyen?: string | null;
  trangThai?: number | null;
  maTinh?: Pick<IDanhMucTinh, 'id'> | null;
}

export type NewDanhMucHuyen = Omit<IDanhMucHuyen, 'id'> & { id: null };
