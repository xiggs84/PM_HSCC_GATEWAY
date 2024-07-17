import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISoCongChung, NewSoCongChung } from '../so-cong-chung.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISoCongChung for edit and NewSoCongChungFormGroupInput for create.
 */
type SoCongChungFormGroupInput = ISoCongChung | PartialWithRequiredKeyOf<NewSoCongChung>;

type SoCongChungFormDefaults = Pick<NewSoCongChung, 'id'>;

type SoCongChungFormGroupContent = {
  id: FormControl<ISoCongChung['id'] | NewSoCongChung['id']>;
  ngayThaoTac: FormControl<ISoCongChung['ngayThaoTac']>;
  idSo: FormControl<ISoCongChung['idSo']>;
  idDonVi: FormControl<ISoCongChung['idDonVi']>;
  tenSo: FormControl<ISoCongChung['tenSo']>;
  giaTri: FormControl<ISoCongChung['giaTri']>;
  nguoiThaoTac: FormControl<ISoCongChung['nguoiThaoTac']>;
  trangThai: FormControl<ISoCongChung['trangThai']>;
  idLoaiSo: FormControl<ISoCongChung['idLoaiSo']>;
};

export type SoCongChungFormGroup = FormGroup<SoCongChungFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SoCongChungFormService {
  createSoCongChungFormGroup(soCongChung: SoCongChungFormGroupInput = { id: null }): SoCongChungFormGroup {
    const soCongChungRawValue = {
      ...this.getFormDefaults(),
      ...soCongChung,
    };
    return new FormGroup<SoCongChungFormGroupContent>({
      id: new FormControl(
        { value: soCongChungRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      ngayThaoTac: new FormControl(soCongChungRawValue.ngayThaoTac),
      idSo: new FormControl(soCongChungRawValue.idSo),
      idDonVi: new FormControl(soCongChungRawValue.idDonVi),
      tenSo: new FormControl(soCongChungRawValue.tenSo),
      giaTri: new FormControl(soCongChungRawValue.giaTri),
      nguoiThaoTac: new FormControl(soCongChungRawValue.nguoiThaoTac),
      trangThai: new FormControl(soCongChungRawValue.trangThai),
      idLoaiSo: new FormControl(soCongChungRawValue.idLoaiSo),
    });
  }

  getSoCongChung(form: SoCongChungFormGroup): ISoCongChung | NewSoCongChung {
    return form.getRawValue() as ISoCongChung | NewSoCongChung;
  }

  resetForm(form: SoCongChungFormGroup, soCongChung: SoCongChungFormGroupInput): void {
    const soCongChungRawValue = { ...this.getFormDefaults(), ...soCongChung };
    form.reset(
      {
        ...soCongChungRawValue,
        id: { value: soCongChungRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SoCongChungFormDefaults {
    return {
      id: null,
    };
  }
}
