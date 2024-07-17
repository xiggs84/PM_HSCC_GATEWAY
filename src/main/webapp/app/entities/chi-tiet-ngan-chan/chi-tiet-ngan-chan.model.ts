import dayjs from 'dayjs/esm';

export interface IChiTietNganChan {
  id: number;
  stt?: number | null;
  idDoiTuong?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  loaiDoiTuong?: number | null;
  soHsCv?: string | null;
  soCc?: string | null;
  soVaoSo?: string | null;
  moTa?: string | null;
  ngayNganChan?: dayjs.Dayjs | null;
  ngayBdNganChan?: dayjs.Dayjs | null;
  ngayKtNganChan?: dayjs.Dayjs | null;
  trangThai?: number | null;
  nguoiThaoTac?: number | null;
  loaiNganChan?: number | null;
  ngayCongVan?: dayjs.Dayjs | null;
}

export type NewChiTietNganChan = Omit<IChiTietNganChan, 'id'> & { id: null };
