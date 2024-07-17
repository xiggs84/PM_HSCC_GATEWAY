import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhSachHopDong, NewDanhSachHopDong } from '../danh-sach-hop-dong.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhSachHopDong for edit and NewDanhSachHopDongFormGroupInput for create.
 */
type DanhSachHopDongFormGroupInput = IDanhSachHopDong | PartialWithRequiredKeyOf<NewDanhSachHopDong>;

type DanhSachHopDongFormDefaults = Pick<NewDanhSachHopDong, 'id'>;

type DanhSachHopDongFormGroupContent = {
  id: FormControl<IDanhSachHopDong['id'] | NewDanhSachHopDong['id']>;
  ngayLapHd: FormControl<IDanhSachHopDong['ngayLapHd']>;
  nguoiLapHd: FormControl<IDanhSachHopDong['nguoiLapHd']>;
  trangThai: FormControl<IDanhSachHopDong['trangThai']>;
  idLoaiHd: FormControl<IDanhSachHopDong['idLoaiHd']>;
  idDonVi: FormControl<IDanhSachHopDong['idDonVi']>;
  ngayThaoTac: FormControl<IDanhSachHopDong['ngayThaoTac']>;
  nguoiThaoTac: FormControl<IDanhSachHopDong['nguoiThaoTac']>;
  srcHopDong: FormControl<IDanhSachHopDong['srcHopDong']>;
  soCongChung: FormControl<IDanhSachHopDong['soCongChung']>;
  congChungVien: FormControl<IDanhSachHopDong['congChungVien']>;
  soTienRutTrich: FormControl<IDanhSachHopDong['soTienRutTrich']>;
  hdThuCong: FormControl<IDanhSachHopDong['hdThuCong']>;
  trangThaiRutTrich: FormControl<IDanhSachHopDong['trangThaiRutTrich']>;
  chuKyNgoaiTruSo: FormControl<IDanhSachHopDong['chuKyNgoaiTruSo']>;
  strSearch: FormControl<IDanhSachHopDong['strSearch']>;
  ngayText: FormControl<IDanhSachHopDong['ngayText']>;
  ngayRutTrichText: FormControl<IDanhSachHopDong['ngayRutTrichText']>;
  ngayThaoTacRutTrich: FormControl<IDanhSachHopDong['ngayThaoTacRutTrich']>;
  thuLaoCongChung: FormControl<IDanhSachHopDong['thuLaoCongChung']>;
  quyenLaiSt: FormControl<IDanhSachHopDong['quyenLaiSt']>;
  soLaiSt: FormControl<IDanhSachHopDong['soLaiSt']>;
  quyenLaiTl: FormControl<IDanhSachHopDong['quyenLaiTl']>;
  soLaiTl: FormControl<IDanhSachHopDong['soLaiTl']>;
  srcKySoPdf: FormControl<IDanhSachHopDong['srcKySoPdf']>;
  srcKySoPdfSigned: FormControl<IDanhSachHopDong['srcKySoPdfSigned']>;
  idHopDong: FormControl<IDanhSachHopDong['idHopDong']>;
  idSoCongChung: FormControl<IDanhSachHopDong['idSoCongChung']>;
};

export type DanhSachHopDongFormGroup = FormGroup<DanhSachHopDongFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhSachHopDongFormService {
  createDanhSachHopDongFormGroup(danhSachHopDong: DanhSachHopDongFormGroupInput = { id: null }): DanhSachHopDongFormGroup {
    const danhSachHopDongRawValue = {
      ...this.getFormDefaults(),
      ...danhSachHopDong,
    };
    return new FormGroup<DanhSachHopDongFormGroupContent>({
      id: new FormControl(
        { value: danhSachHopDongRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      ngayLapHd: new FormControl(danhSachHopDongRawValue.ngayLapHd),
      nguoiLapHd: new FormControl(danhSachHopDongRawValue.nguoiLapHd),
      trangThai: new FormControl(danhSachHopDongRawValue.trangThai),
      idLoaiHd: new FormControl(danhSachHopDongRawValue.idLoaiHd),
      idDonVi: new FormControl(danhSachHopDongRawValue.idDonVi),
      ngayThaoTac: new FormControl(danhSachHopDongRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(danhSachHopDongRawValue.nguoiThaoTac),
      srcHopDong: new FormControl(danhSachHopDongRawValue.srcHopDong),
      soCongChung: new FormControl(danhSachHopDongRawValue.soCongChung),
      congChungVien: new FormControl(danhSachHopDongRawValue.congChungVien),
      soTienRutTrich: new FormControl(danhSachHopDongRawValue.soTienRutTrich),
      hdThuCong: new FormControl(danhSachHopDongRawValue.hdThuCong),
      trangThaiRutTrich: new FormControl(danhSachHopDongRawValue.trangThaiRutTrich),
      chuKyNgoaiTruSo: new FormControl(danhSachHopDongRawValue.chuKyNgoaiTruSo),
      strSearch: new FormControl(danhSachHopDongRawValue.strSearch),
      ngayText: new FormControl(danhSachHopDongRawValue.ngayText),
      ngayRutTrichText: new FormControl(danhSachHopDongRawValue.ngayRutTrichText),
      ngayThaoTacRutTrich: new FormControl(danhSachHopDongRawValue.ngayThaoTacRutTrich),
      thuLaoCongChung: new FormControl(danhSachHopDongRawValue.thuLaoCongChung),
      quyenLaiSt: new FormControl(danhSachHopDongRawValue.quyenLaiSt),
      soLaiSt: new FormControl(danhSachHopDongRawValue.soLaiSt),
      quyenLaiTl: new FormControl(danhSachHopDongRawValue.quyenLaiTl),
      soLaiTl: new FormControl(danhSachHopDongRawValue.soLaiTl),
      srcKySoPdf: new FormControl(danhSachHopDongRawValue.srcKySoPdf),
      srcKySoPdfSigned: new FormControl(danhSachHopDongRawValue.srcKySoPdfSigned),
      idHopDong: new FormControl(danhSachHopDongRawValue.idHopDong),
      idSoCongChung: new FormControl(danhSachHopDongRawValue.idSoCongChung),
    });
  }

  getDanhSachHopDong(form: DanhSachHopDongFormGroup): IDanhSachHopDong | NewDanhSachHopDong {
    return form.getRawValue() as IDanhSachHopDong | NewDanhSachHopDong;
  }

  resetForm(form: DanhSachHopDongFormGroup, danhSachHopDong: DanhSachHopDongFormGroupInput): void {
    const danhSachHopDongRawValue = { ...this.getFormDefaults(), ...danhSachHopDong };
    form.reset(
      {
        ...danhSachHopDongRawValue,
        id: { value: danhSachHopDongRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhSachHopDongFormDefaults {
    return {
      id: null,
    };
  }
}
