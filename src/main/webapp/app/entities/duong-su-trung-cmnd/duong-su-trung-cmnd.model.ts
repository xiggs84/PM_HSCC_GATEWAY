import dayjs from 'dayjs/esm';

export interface IDuongSuTrungCmnd {
  id: number;
  idDuongSu?: number | null;
  tenDuongSu?: string | null;
  idLoaiDs?: number | null;
  diaChi?: string | null;
  trangThai?: number | null;
  thongTinDs?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDsGoc?: number | null;
  idTinhTrang?: number | null;
  idMaster?: string | null;
  idDonVi?: number | null;
  strSearch?: string | null;
  soGiayTo?: string | null;
  idDuongSuMin?: number | null;
  idMasterMin?: number | null;
  idDuongSuMax?: number | null;
  idMasterMax?: number | null;
}

export type NewDuongSuTrungCmnd = Omit<IDuongSuTrungCmnd, 'id'> & { id: null };
