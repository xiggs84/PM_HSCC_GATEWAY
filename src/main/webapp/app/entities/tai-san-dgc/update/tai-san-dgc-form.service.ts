import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaiSanDgc, NewTaiSanDgc } from '../tai-san-dgc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaiSanDgc for edit and NewTaiSanDgcFormGroupInput for create.
 */
type TaiSanDgcFormGroupInput = ITaiSanDgc | PartialWithRequiredKeyOf<NewTaiSanDgc>;

type TaiSanDgcFormDefaults = Pick<NewTaiSanDgc, 'id'>;

type TaiSanDgcFormGroupContent = {
  id: FormControl<ITaiSanDgc['id'] | NewTaiSanDgc['id']>;
  idTaiSan: FormControl<ITaiSanDgc['idTaiSan']>;
  tenTaiSan: FormControl<ITaiSanDgc['tenTaiSan']>;
  trangThai: FormControl<ITaiSanDgc['trangThai']>;
  thongTinTs: FormControl<ITaiSanDgc['thongTinTs']>;
  idLoaiTs: FormControl<ITaiSanDgc['idLoaiTs']>;
  ghiChu: FormControl<ITaiSanDgc['ghiChu']>;
  ngayThaoTac: FormControl<ITaiSanDgc['ngayThaoTac']>;
  nguoiThaoTac: FormControl<ITaiSanDgc['nguoiThaoTac']>;
  idDuongSu: FormControl<ITaiSanDgc['idDuongSu']>;
  idTsGoc: FormControl<ITaiSanDgc['idTsGoc']>;
  maTaiSan: FormControl<ITaiSanDgc['maTaiSan']>;
  idTinhTrang: FormControl<ITaiSanDgc['idTinhTrang']>;
  idLoaiNganChan: FormControl<ITaiSanDgc['idLoaiNganChan']>;
  ngayBdNganChan: FormControl<ITaiSanDgc['ngayBdNganChan']>;
  ngayKtNganChan: FormControl<ITaiSanDgc['ngayKtNganChan']>;
  idMaster: FormControl<ITaiSanDgc['idMaster']>;
  strSearch: FormControl<ITaiSanDgc['strSearch']>;
  idDonVi: FormControl<ITaiSanDgc['idDonVi']>;
  soHsCv: FormControl<ITaiSanDgc['soHsCv']>;
  soCc: FormControl<ITaiSanDgc['soCc']>;
  soVaoSo: FormControl<ITaiSanDgc['soVaoSo']>;
  moTa: FormControl<ITaiSanDgc['moTa']>;
};

export type TaiSanDgcFormGroup = FormGroup<TaiSanDgcFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaiSanDgcFormService {
  createTaiSanDgcFormGroup(taiSanDgc: TaiSanDgcFormGroupInput = { id: null }): TaiSanDgcFormGroup {
    const taiSanDgcRawValue = {
      ...this.getFormDefaults(),
      ...taiSanDgc,
    };
    return new FormGroup<TaiSanDgcFormGroupContent>({
      id: new FormControl(
        { value: taiSanDgcRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(taiSanDgcRawValue.idTaiSan),
      tenTaiSan: new FormControl(taiSanDgcRawValue.tenTaiSan),
      trangThai: new FormControl(taiSanDgcRawValue.trangThai),
      thongTinTs: new FormControl(taiSanDgcRawValue.thongTinTs),
      idLoaiTs: new FormControl(taiSanDgcRawValue.idLoaiTs),
      ghiChu: new FormControl(taiSanDgcRawValue.ghiChu),
      ngayThaoTac: new FormControl(taiSanDgcRawValue.ngayThaoTac),
      nguoiThaoTac: new FormControl(taiSanDgcRawValue.nguoiThaoTac),
      idDuongSu: new FormControl(taiSanDgcRawValue.idDuongSu),
      idTsGoc: new FormControl(taiSanDgcRawValue.idTsGoc),
      maTaiSan: new FormControl(taiSanDgcRawValue.maTaiSan),
      idTinhTrang: new FormControl(taiSanDgcRawValue.idTinhTrang),
      idLoaiNganChan: new FormControl(taiSanDgcRawValue.idLoaiNganChan),
      ngayBdNganChan: new FormControl(taiSanDgcRawValue.ngayBdNganChan),
      ngayKtNganChan: new FormControl(taiSanDgcRawValue.ngayKtNganChan),
      idMaster: new FormControl(taiSanDgcRawValue.idMaster),
      strSearch: new FormControl(taiSanDgcRawValue.strSearch),
      idDonVi: new FormControl(taiSanDgcRawValue.idDonVi),
      soHsCv: new FormControl(taiSanDgcRawValue.soHsCv),
      soCc: new FormControl(taiSanDgcRawValue.soCc),
      soVaoSo: new FormControl(taiSanDgcRawValue.soVaoSo),
      moTa: new FormControl(taiSanDgcRawValue.moTa),
    });
  }

  getTaiSanDgc(form: TaiSanDgcFormGroup): ITaiSanDgc | NewTaiSanDgc {
    return form.getRawValue() as ITaiSanDgc | NewTaiSanDgc;
  }

  resetForm(form: TaiSanDgcFormGroup, taiSanDgc: TaiSanDgcFormGroupInput): void {
    const taiSanDgcRawValue = { ...this.getFormDefaults(), ...taiSanDgc };
    form.reset(
      {
        ...taiSanDgcRawValue,
        id: { value: taiSanDgcRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaiSanDgcFormDefaults {
    return {
      id: null,
    };
  }
}
