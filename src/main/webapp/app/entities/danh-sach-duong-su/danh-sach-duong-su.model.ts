import dayjs from 'dayjs/esm';

export interface IDanhSachDuongSu {
  id: number;
  idDuongSu?: number | null;
  tenDuongSu?: string | null;
  idLoaiDs?: number | null;
  diaChi?: string | null;
  trangThai?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDsGoc?: number | null;
  idTinhTrang?: number | null;
  idMaster?: string | null;
  idDonVi?: number | null;
  strSearch?: string | null;
  soGiayTo?: string | null;
  idLoaiNganChan?: number | null;
}

export type NewDanhSachDuongSu = Omit<IDanhSachDuongSu, 'id'> & { id: null };
