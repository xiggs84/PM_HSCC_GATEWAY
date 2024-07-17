import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucDauSoCmnd, NewDanhMucDauSoCmnd } from '../danh-muc-dau-so-cmnd.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucDauSoCmnd for edit and NewDanhMucDauSoCmndFormGroupInput for create.
 */
type DanhMucDauSoCmndFormGroupInput = IDanhMucDauSoCmnd | PartialWithRequiredKeyOf<NewDanhMucDauSoCmnd>;

type DanhMucDauSoCmndFormDefaults = Pick<NewDanhMucDauSoCmnd, 'id'>;

type DanhMucDauSoCmndFormGroupContent = {
  id: FormControl<IDanhMucDauSoCmnd['id'] | NewDanhMucDauSoCmnd['id']>;
  idDauSo: FormControl<IDanhMucDauSoCmnd['idDauSo']>;
  dauSo: FormControl<IDanhMucDauSoCmnd['dauSo']>;
  tinhThanh: FormControl<IDanhMucDauSoCmnd['tinhThanh']>;
  idLoai: FormControl<IDanhMucDauSoCmnd['idLoai']>;
};

export type DanhMucDauSoCmndFormGroup = FormGroup<DanhMucDauSoCmndFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucDauSoCmndFormService {
  createDanhMucDauSoCmndFormGroup(danhMucDauSoCmnd: DanhMucDauSoCmndFormGroupInput = { id: null }): DanhMucDauSoCmndFormGroup {
    const danhMucDauSoCmndRawValue = {
      ...this.getFormDefaults(),
      ...danhMucDauSoCmnd,
    };
    return new FormGroup<DanhMucDauSoCmndFormGroupContent>({
      id: new FormControl(
        { value: danhMucDauSoCmndRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDauSo: new FormControl(danhMucDauSoCmndRawValue.idDauSo),
      dauSo: new FormControl(danhMucDauSoCmndRawValue.dauSo),
      tinhThanh: new FormControl(danhMucDauSoCmndRawValue.tinhThanh),
      idLoai: new FormControl(danhMucDauSoCmndRawValue.idLoai),
    });
  }

  getDanhMucDauSoCmnd(form: DanhMucDauSoCmndFormGroup): IDanhMucDauSoCmnd | NewDanhMucDauSoCmnd {
    return form.getRawValue() as IDanhMucDauSoCmnd | NewDanhMucDauSoCmnd;
  }

  resetForm(form: DanhMucDauSoCmndFormGroup, danhMucDauSoCmnd: DanhMucDauSoCmndFormGroupInput): void {
    const danhMucDauSoCmndRawValue = { ...this.getFormDefaults(), ...danhMucDauSoCmnd };
    form.reset(
      {
        ...danhMucDauSoCmndRawValue,
        id: { value: danhMucDauSoCmndRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucDauSoCmndFormDefaults {
    return {
      id: null,
    };
  }
}
