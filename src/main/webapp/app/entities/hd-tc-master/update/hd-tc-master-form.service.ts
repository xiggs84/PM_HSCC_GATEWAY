import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHdTcMaster, NewHdTcMaster } from '../hd-tc-master.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHdTcMaster for edit and NewHdTcMasterFormGroupInput for create.
 */
type HdTcMasterFormGroupInput = IHdTcMaster | PartialWithRequiredKeyOf<NewHdTcMaster>;

type HdTcMasterFormDefaults = Pick<NewHdTcMaster, 'id'>;

type HdTcMasterFormGroupContent = {
  id: FormControl<IHdTcMaster['id'] | NewHdTcMaster['id']>;
  idHopDong: FormControl<IHdTcMaster['idHopDong']>;
  ngayLapHd: FormControl<IHdTcMaster['ngayLapHd']>;
  nguoiLapHd: FormControl<IHdTcMaster['nguoiLapHd']>;
  thongTinDuongSu: FormControl<IHdTcMaster['thongTinDuongSu']>;
  thongTinTaiSan: FormControl<IHdTcMaster['thongTinTaiSan']>;
  thongTinVanBan: FormControl<IHdTcMaster['thongTinVanBan']>;
  trangThai: FormControl<IHdTcMaster['trangThai']>;
  idLoaiHd: FormControl<IHdTcMaster['idLoaiHd']>;
  dieuKhoanHd: FormControl<IHdTcMaster['dieuKhoanHd']>;
  idDonVi: FormControl<IHdTcMaster['idDonVi']>;
  ngayThaoTac: FormControl<IHdTcMaster['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IHdTcMaster['nguoiThaoTac']>;
  idHdGoc: FormControl<IHdTcMaster['idHdGoc']>;
  thongTinChuyenNhuong: FormControl<IHdTcMaster['thongTinChuyenNhuong']>;
  maHopDong: FormControl<IHdTcMaster['maHopDong']>;
  srcHopDong: FormControl<IHdTcMaster['srcHopDong']>;
  ngayHen: FormControl<IHdTcMaster['ngayHen']>;
  idSoCongChung: FormControl<IHdTcMaster['idSoCongChung']>;
  soCongChung: FormControl<IHdTcMaster['soCongChung']>;
  congChungVien: FormControl<IHdTcMaster['congChungVien']>;
  ngayKyHd: FormControl<IHdTcMaster['ngayKyHd']>;
  nguoiRutTrich: FormControl<IHdTcMaster['nguoiRutTrich']>;
  soTienRutTrich: FormControl<IHdTcMaster['soTienRutTrich']>;
  ngayRutTrich: FormControl<IHdTcMaster['ngayRutTrich']>;
  hdThuCong: FormControl<IHdTcMaster['hdThuCong']>;
  trangThaiRutTrich: FormControl<IHdTcMaster['trangThaiRutTrich']>;
  chuKyNgoaiTruSo: FormControl<IHdTcMaster['chuKyNgoaiTruSo']>;
  strSearch: FormControl<IHdTcMaster['strSearch']>;
  idMaster: FormControl<IHdTcMaster['idMaster']>;
  idHdSdHb: FormControl<IHdTcMaster['idHdSdHb']>;
  srcDmMaster: FormControl<IHdTcMaster['srcDmMaster']>;
  repRefUnique: FormControl<IHdTcMaster['repRefUnique']>;
};

export type HdTcMasterFormGroup = FormGroup<HdTcMasterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HdTcMasterFormService {
  createHdTcMasterFormGroup(hdTcMaster: HdTcMasterFormGroupInput = { id: null }): HdTcMasterFormGroup {
    const hdTcMasterRawValue = {
      ...this.getFormDefaults(),
      ...hdTcMaster,
    };
    return new FormGroup<HdTcMasterFormGroupContent>({
      id: new FormControl(
        { value: hdTcMasterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idHopDong: new FormControl(hdTcMasterRawValue.idHopDong),
      ngayLapHd: new FormControl(hdTcMasterRawValue.ngayLapHd),
      nguoiLapHd: new FormControl(hdTcMasterRawValue.nguoiLapHd),
      thongTinDuongSu: new FormControl(hdTcMasterRawValue.thongTinDuongSu),
      thongTinTaiSan: new FormControl(hdTcMasterRawValue.thongTinTaiSan),
      thongTinVanBan: new FormControl(hdTcMasterRawValue.thongTinVanBan),
      trangThai: new FormControl(hdTcMasterRawValue.trangThai),
      idLoaiHd: new FormControl(hdTcMasterRawValue.idLoaiHd),
      dieuKhoanHd: new FormControl(hdTcMasterRawValue.dieuKhoanHd),
      idDonVi: new FormControl(hdTcMasterRawValue.idDonVi),
      ngayThaoTac: new FormControl(hdTcMasterRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(hdTcMasterRawValue.nguoiThaoTac),
      idHdGoc: new FormControl(hdTcMasterRawValue.idHdGoc),
      thongTinChuyenNhuong: new FormControl(hdTcMasterRawValue.thongTinChuyenNhuong),
      maHopDong: new FormControl(hdTcMasterRawValue.maHopDong),
      srcHopDong: new FormControl(hdTcMasterRawValue.srcHopDong),
      ngayHen: new FormControl(hdTcMasterRawValue.ngayHen),
      idSoCongChung: new FormControl(hdTcMasterRawValue.idSoCongChung),
      soCongChung: new FormControl(hdTcMasterRawValue.soCongChung),
      congChungVien: new FormControl(hdTcMasterRawValue.congChungVien),
      ngayKyHd: new FormControl(hdTcMasterRawValue.ngayKyHd),
      nguoiRutTrich: new FormControl(hdTcMasterRawValue.nguoiRutTrich),
      soTienRutTrich: new FormControl(hdTcMasterRawValue.soTienRutTrich),
      ngayRutTrich: new FormControl(hdTcMasterRawValue.ngayRutTrich),
      hdThuCong: new FormControl(hdTcMasterRawValue.hdThuCong),
      trangThaiRutTrich: new FormControl(hdTcMasterRawValue.trangThaiRutTrich),
      chuKyNgoaiTruSo: new FormControl(hdTcMasterRawValue.chuKyNgoaiTruSo),
      strSearch: new FormControl(hdTcMasterRawValue.strSearch),
      idMaster: new FormControl(hdTcMasterRawValue.idMaster),
      idHdSdHb: new FormControl(hdTcMasterRawValue.idHdSdHb),
      srcDmMaster: new FormControl(hdTcMasterRawValue.srcDmMaster),
      repRefUnique: new FormControl(hdTcMasterRawValue.repRefUnique),
    });
  }

  getHdTcMaster(form: HdTcMasterFormGroup): IHdTcMaster | NewHdTcMaster {
    return form.getRawValue() as IHdTcMaster | NewHdTcMaster;
  }

  resetForm(form: HdTcMasterFormGroup, hdTcMaster: HdTcMasterFormGroupInput): void {
    const hdTcMasterRawValue = { ...this.getFormDefaults(), ...hdTcMaster };
    form.reset(
      {
        ...hdTcMasterRawValue,
        id: { value: hdTcMasterRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HdTcMasterFormDefaults {
    return {
      id: null,
    };
  }
}
