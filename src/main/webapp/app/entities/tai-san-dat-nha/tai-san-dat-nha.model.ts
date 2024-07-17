import dayjs from 'dayjs/esm';

export interface ITaiSanDatNha {
  id: number;
  idTaiSan?: number | null;
  tenTaiSan?: string | null;
  trangThai?: number | null;
  thongTinTs?: string | null;
  idLoaiTs?: number | null;
  ghiChu?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  idDuongSu?: number | null;
  idTsGoc?: number | null;
  maTaiSan?: string | null;
  idTinhTrang?: number | null;
  idLoaiNganChan?: number | null;
  ngayBdNganChan?: dayjs.Dayjs | null;
  ngayKtNganChan?: dayjs.Dayjs | null;
  idMaster?: number | null;
  strSearch?: string | null;
  idDonVi?: number | null;
  soHsCv?: number | null;
  soCc?: number | null;
  soVaoSo?: number | null;
  moTa?: string | null;
  loaiNganChan?: number | null;
}

export type NewTaiSanDatNha = Omit<ITaiSanDatNha, 'id'> & { id: null };
