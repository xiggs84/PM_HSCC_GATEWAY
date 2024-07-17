import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IThongTinChungHopDong, NewThongTinChungHopDong } from '../thong-tin-chung-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IThongTinChungHopDong for edit and NewThongTinChungHopDongFormGroupInput for create.
 */
type ThongTinChungHopDongFormGroupInput = IThongTinChungHopDong | PartialWithRequiredKeyOf<NewThongTinChungHopDong>;

type ThongTinChungHopDongFormDefaults = Pick<NewThongTinChungHopDong, 'id'>;

type ThongTinChungHopDongFormGroupContent = {
  id: FormControl<IThongTinChungHopDong['id'] | NewThongTinChungHopDong['id']>;
  ngayLapHd: FormControl<IThongTinChungHopDong['ngayLapHd']>;
  nguoiLapHd: FormControl<IThongTinChungHopDong['nguoiLapHd']>;
  thongTinVanBan: FormControl<IThongTinChungHopDong['thongTinVanBan']>;
  trangThai: FormControl<IThongTinChungHopDong['trangThai']>;
  idLoaiHd: FormControl<IThongTinChungHopDong['idLoaiHd']>;
  dieuKhoanHd: FormControl<IThongTinChungHopDong['dieuKhoanHd']>;
  idDonVi: FormControl<IThongTinChungHopDong['idDonVi']>;
  ngayThaoTac: FormControl<IThongTinChungHopDong['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IThongTinChungHopDong['nguoiThaoTac']>;
  idHdGoc: FormControl<IThongTinChungHopDong['idHdGoc']>;
  maHopDong: FormControl<IThongTinChungHopDong['maHopDong']>;
  srcHopDong: FormControl<IThongTinChungHopDong['srcHopDong']>;
  ngayHen: FormControl<IThongTinChungHopDong['ngayHen']>;
  soCongChung: FormControl<IThongTinChungHopDong['soCongChung']>;
  congChungVien: FormControl<IThongTinChungHopDong['congChungVien']>;
  ngayKyHd: FormControl<IThongTinChungHopDong['ngayKyHd']>;
  nguoiRutTrich: FormControl<IThongTinChungHopDong['nguoiRutTrich']>;
  soTienRutTrich: FormControl<IThongTinChungHopDong['soTienRutTrich']>;
  ngayRutTrich: FormControl<IThongTinChungHopDong['ngayRutTrich']>;
  hdThuCong: FormControl<IThongTinChungHopDong['hdThuCong']>;
  trangThaiRutTrich: FormControl<IThongTinChungHopDong['trangThaiRutTrich']>;
  chuKyNgoaiTruSo: FormControl<IThongTinChungHopDong['chuKyNgoaiTruSo']>;
  strSearch: FormControl<IThongTinChungHopDong['strSearch']>;
  idMaster: FormControl<IThongTinChungHopDong['idMaster']>;
  idHdSdHb: FormControl<IThongTinChungHopDong['idHdSdHb']>;
  srcDmMaster: FormControl<IThongTinChungHopDong['srcDmMaster']>;
  repRefUnique: FormControl<IThongTinChungHopDong['repRefUnique']>;
  ngayText: FormControl<IThongTinChungHopDong['ngayText']>;
  thongTinChung: FormControl<IThongTinChungHopDong['thongTinChung']>;
  thongTinChungClob: FormControl<IThongTinChungHopDong['thongTinChungClob']>;
  idHopDong: FormControl<IThongTinChungHopDong['idHopDong']>;
  idLoaiHD: FormControl<IThongTinChungHopDong['idLoaiHD']>;
  idSoCongChung: FormControl<IThongTinChungHopDong['idSoCongChung']>;
};

export type ThongTinChungHopDongFormGroup = FormGroup<ThongTinChungHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ThongTinChungHopDongFormService {
  createThongTinChungHopDongFormGroup(
    thongTinChungHopDong: ThongTinChungHopDongFormGroupInput = { id: null },
  ): ThongTinChungHopDongFormGroup {
    const thongTinChungHopDongRawValue = {
      ...this.getFormDefaults(),
      ...thongTinChungHopDong,
    };
    return new FormGroup<ThongTinChungHopDongFormGroupContent>({
      id: new FormControl(
        { value: thongTinChungHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      ngayLapHd: new FormControl(thongTinChungHopDongRawValue.ngayLapHd),
      nguoiLapHd: new FormControl(thongTinChungHopDongRawValue.nguoiLapHd),
      thongTinVanBan: new FormControl(thongTinChungHopDongRawValue.thongTinVanBan),
      trangThai: new FormControl(thongTinChungHopDongRawValue.trangThai),
      idLoaiHd: new FormControl(thongTinChungHopDongRawValue.idLoaiHd),
      dieuKhoanHd: new FormControl(thongTinChungHopDongRawValue.dieuKhoanHd),
      idDonVi: new FormControl(thongTinChungHopDongRawValue.idDonVi),
      ngayThaoTac: new FormControl(thongTinChungHopDongRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(thongTinChungHopDongRawValue.nguoiThaoTac),
      idHdGoc: new FormControl(thongTinChungHopDongRawValue.idHdGoc),
      maHopDong: new FormControl(thongTinChungHopDongRawValue.maHopDong),
      srcHopDong: new FormControl(thongTinChungHopDongRawValue.srcHopDong),
      ngayHen: new FormControl(thongTinChungHopDongRawValue.ngayHen),
      soCongChung: new FormControl(thongTinChungHopDongRawValue.soCongChung),
      congChungVien: new FormControl(thongTinChungHopDongRawValue.congChungVien),
      ngayKyHd: new FormControl(thongTinChungHopDongRawValue.ngayKyHd),
      nguoiRutTrich: new FormControl(thongTinChungHopDongRawValue.nguoiRutTrich),
      soTienRutTrich: new FormControl(thongTinChungHopDongRawValue.soTienRutTrich),
      ngayRutTrich: new FormControl(thongTinChungHopDongRawValue.ngayRutTrich),
      hdThuCong: new FormControl(thongTinChungHopDongRawValue.hdThuCong),
      trangThaiRutTrich: new FormControl(thongTinChungHopDongRawValue.trangThaiRutTrich),
      chuKyNgoaiTruSo: new FormControl(thongTinChungHopDongRawValue.chuKyNgoaiTruSo),
      strSearch: new FormControl(thongTinChungHopDongRawValue.strSearch),
      idMaster: new FormControl(thongTinChungHopDongRawValue.idMaster),
      idHdSdHb: new FormControl(thongTinChungHopDongRawValue.idHdSdHb),
      srcDmMaster: new FormControl(thongTinChungHopDongRawValue.srcDmMaster),
      repRefUnique: new FormControl(thongTinChungHopDongRawValue.repRefUnique),
      ngayText: new FormControl(thongTinChungHopDongRawValue.ngayText),
      thongTinChung: new FormControl(thongTinChungHopDongRawValue.thongTinChung),
      thongTinChungClob: new FormControl(thongTinChungHopDongRawValue.thongTinChungClob),
      idHopDong: new FormControl(thongTinChungHopDongRawValue.idHopDong),
      idLoaiHD: new FormControl(thongTinChungHopDongRawValue.idLoaiHD),
      idSoCongChung: new FormControl(thongTinChungHopDongRawValue.idSoCongChung),
    });
  }

  getThongTinChungHopDong(form: ThongTinChungHopDongFormGroup): IThongTinChungHopDong | NewThongTinChungHopDong {
    return form.getRawValue() as IThongTinChungHopDong | NewThongTinChungHopDong;
  }

  resetForm(form: ThongTinChungHopDongFormGroup, thongTinChungHopDong: ThongTinChungHopDongFormGroupInput): void {
    const thongTinChungHopDongRawValue = { ...this.getFormDefaults(), ...thongTinChungHopDong };
    form.reset(
      {
        ...thongTinChungHopDongRawValue,
        id: { value: thongTinChungHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ThongTinChungHopDongFormDefaults {
    return {
      id: null,
    };
  }
}
