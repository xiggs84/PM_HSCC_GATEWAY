import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucNoiCapQsh, NewDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucNoiCapQsh for edit and NewDanhMucNoiCapQshFormGroupInput for create.
 */
type DanhMucNoiCapQshFormGroupInput = IDanhMucNoiCapQsh | PartialWithRequiredKeyOf<NewDanhMucNoiCapQsh>;

type DanhMucNoiCapQshFormDefaults = Pick<NewDanhMucNoiCapQsh, 'id'>;

type DanhMucNoiCapQshFormGroupContent = {
  id: FormControl<IDanhMucNoiCapQsh['id'] | NewDanhMucNoiCapQsh['id']>;
  idNoiCap: FormControl<IDanhMucNoiCapQsh['idNoiCap']>;
  dienGiai: FormControl<IDanhMucNoiCapQsh['dienGiai']>;
  idDonVi: FormControl<IDanhMucNoiCapQsh['idDonVi']>;
};

export type DanhMucNoiCapQshFormGroup = FormGroup<DanhMucNoiCapQshFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucNoiCapQshFormService {
  createDanhMucNoiCapQshFormGroup(danhMucNoiCapQsh: DanhMucNoiCapQshFormGroupInput = { id: null }): DanhMucNoiCapQshFormGroup {
    const danhMucNoiCapQshRawValue = {
      ...this.getFormDefaults(),
      ...danhMucNoiCapQsh,
    };
    return new FormGroup<DanhMucNoiCapQshFormGroupContent>({
      id: new FormControl(
        { value: danhMucNoiCapQshRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idNoiCap: new FormControl(danhMucNoiCapQshRawValue.idNoiCap),
      dienGiai: new FormControl(danhMucNoiCapQshRawValue.dienGiai),
      idDonVi: new FormControl(danhMucNoiCapQshRawValue.idDonVi),
    });
  }

  getDanhMucNoiCapQsh(form: DanhMucNoiCapQshFormGroup): IDanhMucNoiCapQsh | NewDanhMucNoiCapQsh {
    return form.getRawValue() as IDanhMucNoiCapQsh | NewDanhMucNoiCapQsh;
  }

  resetForm(form: DanhMucNoiCapQshFormGroup, danhMucNoiCapQsh: DanhMucNoiCapQshFormGroupInput): void {
    const danhMucNoiCapQshRawValue = { ...this.getFormDefaults(), ...danhMucNoiCapQsh };
    form.reset(
      {
        ...danhMucNoiCapQshRawValue,
        id: { value: danhMucNoiCapQshRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucNoiCapQshFormDefaults {
    return {
      id: null,
    };
  }
}
