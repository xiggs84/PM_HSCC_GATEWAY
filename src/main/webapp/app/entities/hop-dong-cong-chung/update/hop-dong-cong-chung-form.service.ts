import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHopDongCongChung, NewHopDongCongChung } from '../hop-dong-cong-chung.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHopDongCongChung for edit and NewHopDongCongChungFormGroupInput for create.
 */
type HopDongCongChungFormGroupInput = IHopDongCongChung | PartialWithRequiredKeyOf<NewHopDongCongChung>;

type HopDongCongChungFormDefaults = Pick<NewHopDongCongChung, 'id'>;

type HopDongCongChungFormGroupContent = {
  id: FormControl<IHopDongCongChung['id'] | NewHopDongCongChung['id']>;
  idHopDong: FormControl<IHopDongCongChung['idHopDong']>;
  ngayLapHd: FormControl<IHopDongCongChung['ngayLapHd']>;
  nguoiLapHd: FormControl<IHopDongCongChung['nguoiLapHd']>;
  thongTinDuongSu: FormControl<IHopDongCongChung['thongTinDuongSu']>;
  thongTinTaiSan: FormControl<IHopDongCongChung['thongTinTaiSan']>;
  thongTinVanBan: FormControl<IHopDongCongChung['thongTinVanBan']>;
  trangThai: FormControl<IHopDongCongChung['trangThai']>;
  idLoaiHd: FormControl<IHopDongCongChung['idLoaiHd']>;
  dieuKhoanHd: FormControl<IHopDongCongChung['dieuKhoanHd']>;
  idDonVi: FormControl<IHopDongCongChung['idDonVi']>;
  ngayThaoTac: FormControl<IHopDongCongChung['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IHopDongCongChung['nguoiThaoTac']>;
  idHdGoc: FormControl<IHopDongCongChung['idHdGoc']>;
  thongTinChuyenNhuong: FormControl<IHopDongCongChung['thongTinChuyenNhuong']>;
  maHopDong: FormControl<IHopDongCongChung['maHopDong']>;
  srcHopDong: FormControl<IHopDongCongChung['srcHopDong']>;
  ngayHen: FormControl<IHopDongCongChung['ngayHen']>;
  soCongChung: FormControl<IHopDongCongChung['soCongChung']>;
  congChungVien: FormControl<IHopDongCongChung['congChungVien']>;
  ngayKyHd: FormControl<IHopDongCongChung['ngayKyHd']>;
  nguoiRutTrich: FormControl<IHopDongCongChung['nguoiRutTrich']>;
  soTienRutTrich: FormControl<IHopDongCongChung['soTienRutTrich']>;
  ngayRutTrich: FormControl<IHopDongCongChung['ngayRutTrich']>;
  hdThuCong: FormControl<IHopDongCongChung['hdThuCong']>;
  trangThaiRutTrich: FormControl<IHopDongCongChung['trangThaiRutTrich']>;
  chuKyNgoaiTruSo: FormControl<IHopDongCongChung['chuKyNgoaiTruSo']>;
  strSearch: FormControl<IHopDongCongChung['strSearch']>;
  idMaster: FormControl<IHopDongCongChung['idMaster']>;
  idHdSdHb: FormControl<IHopDongCongChung['idHdSdHb']>;
  srcDmMaster: FormControl<IHopDongCongChung['srcDmMaster']>;
  repRefUnique: FormControl<IHopDongCongChung['repRefUnique']>;
  ngayText: FormControl<IHopDongCongChung['ngayText']>;
  ngayNum: FormControl<IHopDongCongChung['ngayNum']>;
  ngayThaoTacRutTrich: FormControl<IHopDongCongChung['ngayThaoTacRutTrich']>;
  thuLaoCongChung: FormControl<IHopDongCongChung['thuLaoCongChung']>;
  quyenLaiSt: FormControl<IHopDongCongChung['quyenLaiSt']>;
  soLaiSt: FormControl<IHopDongCongChung['soLaiSt']>;
  quyenLaiTl: FormControl<IHopDongCongChung['quyenLaiTl']>;
  soLaiTl: FormControl<IHopDongCongChung['soLaiTl']>;
  srcKySoPdf: FormControl<IHopDongCongChung['srcKySoPdf']>;
  srcKySoPdfSigned: FormControl<IHopDongCongChung['srcKySoPdfSigned']>;
  syncStatus: FormControl<IHopDongCongChung['syncStatus']>;
  ngayRutTrichText: FormControl<IHopDongCongChung['ngayRutTrichText']>;
  idLoaiHD: FormControl<IHopDongCongChung['idLoaiHD']>;
  idSoCongChung: FormControl<IHopDongCongChung['idSoCongChung']>;
};

export type HopDongCongChungFormGroup = FormGroup<HopDongCongChungFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HopDongCongChungFormService {
  createHopDongCongChungFormGroup(hopDongCongChung: HopDongCongChungFormGroupInput = { id: null }): HopDongCongChungFormGroup {
    const hopDongCongChungRawValue = {
      ...this.getFormDefaults(),
      ...hopDongCongChung,
    };
    return new FormGroup<HopDongCongChungFormGroupContent>({
      id: new FormControl(
        { value: hopDongCongChungRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idHopDong: new FormControl(hopDongCongChungRawValue.idHopDong),
      ngayLapHd: new FormControl(hopDongCongChungRawValue.ngayLapHd),
      nguoiLapHd: new FormControl(hopDongCongChungRawValue.nguoiLapHd),
      thongTinDuongSu: new FormControl(hopDongCongChungRawValue.thongTinDuongSu),
      thongTinTaiSan: new FormControl(hopDongCongChungRawValue.thongTinTaiSan),
      thongTinVanBan: new FormControl(hopDongCongChungRawValue.thongTinVanBan),
      trangThai: new FormControl(hopDongCongChungRawValue.trangThai),
      idLoaiHd: new FormControl(hopDongCongChungRawValue.idLoaiHd),
      dieuKhoanHd: new FormControl(hopDongCongChungRawValue.dieuKhoanHd),
      idDonVi: new FormControl(hopDongCongChungRawValue.idDonVi),
      ngayThaoTac: new FormControl(hopDongCongChungRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(hopDongCongChungRawValue.nguoiThaoTac),
      idHdGoc: new FormControl(hopDongCongChungRawValue.idHdGoc),
      thongTinChuyenNhuong: new FormControl(hopDongCongChungRawValue.thongTinChuyenNhuong),
      maHopDong: new FormControl(hopDongCongChungRawValue.maHopDong),
      srcHopDong: new FormControl(hopDongCongChungRawValue.srcHopDong),
      ngayHen: new FormControl(hopDongCongChungRawValue.ngayHen),
      soCongChung: new FormControl(hopDongCongChungRawValue.soCongChung),
      congChungVien: new FormControl(hopDongCongChungRawValue.congChungVien),
      ngayKyHd: new FormControl(hopDongCongChungRawValue.ngayKyHd),
      nguoiRutTrich: new FormControl(hopDongCongChungRawValue.nguoiRutTrich),
      soTienRutTrich: new FormControl(hopDongCongChungRawValue.soTienRutTrich),
      ngayRutTrich: new FormControl(hopDongCongChungRawValue.ngayRutTrich),
      hdThuCong: new FormControl(hopDongCongChungRawValue.hdThuCong),
      trangThaiRutTrich: new FormControl(hopDongCongChungRawValue.trangThaiRutTrich),
      chuKyNgoaiTruSo: new FormControl(hopDongCongChungRawValue.chuKyNgoaiTruSo),
      strSearch: new FormControl(hopDongCongChungRawValue.strSearch),
      idMaster: new FormControl(hopDongCongChungRawValue.idMaster),
      idHdSdHb: new FormControl(hopDongCongChungRawValue.idHdSdHb),
      srcDmMaster: new FormControl(hopDongCongChungRawValue.srcDmMaster),
      repRefUnique: new FormControl(hopDongCongChungRawValue.repRefUnique),
      ngayText: new FormControl(hopDongCongChungRawValue.ngayText),
      ngayNum: new FormControl(hopDongCongChungRawValue.ngayNum),
      ngayThaoTacRutTrich: new FormControl(hopDongCongChungRawValue.ngayThaoTacRutTrich),
      thuLaoCongChung: new FormControl(hopDongCongChungRawValue.thuLaoCongChung),
      quyenLaiSt: new FormControl(hopDongCongChungRawValue.quyenLaiSt),
      soLaiSt: new FormControl(hopDongCongChungRawValue.soLaiSt),
      quyenLaiTl: new FormControl(hopDongCongChungRawValue.quyenLaiTl),
      soLaiTl: new FormControl(hopDongCongChungRawValue.soLaiTl),
      srcKySoPdf: new FormControl(hopDongCongChungRawValue.srcKySoPdf),
      srcKySoPdfSigned: new FormControl(hopDongCongChungRawValue.srcKySoPdfSigned),
      syncStatus: new FormControl(hopDongCongChungRawValue.syncStatus),
      ngayRutTrichText: new FormControl(hopDongCongChungRawValue.ngayRutTrichText),
      idLoaiHD: new FormControl(hopDongCongChungRawValue.idLoaiHD),
      idSoCongChung: new FormControl(hopDongCongChungRawValue.idSoCongChung),
    });
  }

  getHopDongCongChung(form: HopDongCongChungFormGroup): IHopDongCongChung | NewHopDongCongChung {
    return form.getRawValue() as IHopDongCongChung | NewHopDongCongChung;
  }

  resetForm(form: HopDongCongChungFormGroup, hopDongCongChung: HopDongCongChungFormGroupInput): void {
    const hopDongCongChungRawValue = { ...this.getFormDefaults(), ...hopDongCongChung };
    form.reset(
      {
        ...hopDongCongChungRawValue,
        id: { value: hopDongCongChungRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HopDongCongChungFormDefaults {
    return {
      id: null,
    };
  }
}
