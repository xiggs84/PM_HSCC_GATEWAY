import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICauHinhThongTinLoaiTaiSan, NewCauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICauHinhThongTinLoaiTaiSan for edit and NewCauHinhThongTinLoaiTaiSanFormGroupInput for create.
 */
type CauHinhThongTinLoaiTaiSanFormGroupInput = ICauHinhThongTinLoaiTaiSan | PartialWithRequiredKeyOf<NewCauHinhThongTinLoaiTaiSan>;

type CauHinhThongTinLoaiTaiSanFormDefaults = Pick<NewCauHinhThongTinLoaiTaiSan, 'id'>;

type CauHinhThongTinLoaiTaiSanFormGroupContent = {
  id: FormControl<ICauHinhThongTinLoaiTaiSan['id'] | NewCauHinhThongTinLoaiTaiSan['id']>;
  idCauHinh: FormControl<ICauHinhThongTinLoaiTaiSan['idCauHinh']>;
  noiDung: FormControl<ICauHinhThongTinLoaiTaiSan['noiDung']>;
  javascript: FormControl<ICauHinhThongTinLoaiTaiSan['javascript']>;
  css: FormControl<ICauHinhThongTinLoaiTaiSan['css']>;
  idLoaiTs: FormControl<ICauHinhThongTinLoaiTaiSan['idLoaiTs']>;
  idDonVi: FormControl<ICauHinhThongTinLoaiTaiSan['idDonVi']>;
  trangThai: FormControl<ICauHinhThongTinLoaiTaiSan['trangThai']>;
  xml: FormControl<ICauHinhThongTinLoaiTaiSan['xml']>;
};

export type CauHinhThongTinLoaiTaiSanFormGroup = FormGroup<CauHinhThongTinLoaiTaiSanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CauHinhThongTinLoaiTaiSanFormService {
  createCauHinhThongTinLoaiTaiSanFormGroup(
    cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanFormGroupInput = { id: null },
  ): CauHinhThongTinLoaiTaiSanFormGroup {
    const cauHinhThongTinLoaiTaiSanRawValue = {
      ...this.getFormDefaults(),
      ...cauHinhThongTinLoaiTaiSan,
    };
    return new FormGroup<CauHinhThongTinLoaiTaiSanFormGroupContent>({
      id: new FormControl(
        { value: cauHinhThongTinLoaiTaiSanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idCauHinh: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.idCauHinh),
      noiDung: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.noiDung),
      javascript: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.javascript),
      css: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.css),
      idLoaiTs: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.idLoaiTs),
      idDonVi: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.idDonVi),
      trangThai: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.trangThai),
      xml: new FormControl(cauHinhThongTinLoaiTaiSanRawValue.xml),
    });
  }

  getCauHinhThongTinLoaiTaiSan(form: CauHinhThongTinLoaiTaiSanFormGroup): ICauHinhThongTinLoaiTaiSan | NewCauHinhThongTinLoaiTaiSan {
    return form.getRawValue() as ICauHinhThongTinLoaiTaiSan | NewCauHinhThongTinLoaiTaiSan;
  }

  resetForm(form: CauHinhThongTinLoaiTaiSanFormGroup, cauHinhThongTinLoaiTaiSan: CauHinhThongTinLoaiTaiSanFormGroupInput): void {
    const cauHinhThongTinLoaiTaiSanRawValue = { ...this.getFormDefaults(), ...cauHinhThongTinLoaiTaiSan };
    form.reset(
      {
        ...cauHinhThongTinLoaiTaiSanRawValue,
        id: { value: cauHinhThongTinLoaiTaiSanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CauHinhThongTinLoaiTaiSanFormDefaults {
    return {
      id: null,
    };
  }
}
