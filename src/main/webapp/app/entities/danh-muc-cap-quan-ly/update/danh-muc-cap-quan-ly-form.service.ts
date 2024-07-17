import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucCapQuanLy, NewDanhMucCapQuanLy } from '../danh-muc-cap-quan-ly.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucCapQuanLy for edit and NewDanhMucCapQuanLyFormGroupInput for create.
 */
type DanhMucCapQuanLyFormGroupInput = IDanhMucCapQuanLy | PartialWithRequiredKeyOf<NewDanhMucCapQuanLy>;

type DanhMucCapQuanLyFormDefaults = Pick<NewDanhMucCapQuanLy, 'id'>;

type DanhMucCapQuanLyFormGroupContent = {
  id: FormControl<IDanhMucCapQuanLy['id'] | NewDanhMucCapQuanLy['id']>;
  idCapQl: FormControl<IDanhMucCapQuanLy['idCapQl']>;
  dienGiai: FormControl<IDanhMucCapQuanLy['dienGiai']>;
};

export type DanhMucCapQuanLyFormGroup = FormGroup<DanhMucCapQuanLyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucCapQuanLyFormService {
  createDanhMucCapQuanLyFormGroup(danhMucCapQuanLy: DanhMucCapQuanLyFormGroupInput = { id: null }): DanhMucCapQuanLyFormGroup {
    const danhMucCapQuanLyRawValue = {
      ...this.getFormDefaults(),
      ...danhMucCapQuanLy,
    };
    return new FormGroup<DanhMucCapQuanLyFormGroupContent>({
      id: new FormControl(
        { value: danhMucCapQuanLyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idCapQl: new FormControl(danhMucCapQuanLyRawValue.idCapQl),
      dienGiai: new FormControl(danhMucCapQuanLyRawValue.dienGiai),
    });
  }

  getDanhMucCapQuanLy(form: DanhMucCapQuanLyFormGroup): IDanhMucCapQuanLy | NewDanhMucCapQuanLy {
    return form.getRawValue() as IDanhMucCapQuanLy | NewDanhMucCapQuanLy;
  }

  resetForm(form: DanhMucCapQuanLyFormGroup, danhMucCapQuanLy: DanhMucCapQuanLyFormGroupInput): void {
    const danhMucCapQuanLyRawValue = { ...this.getFormDefaults(), ...danhMucCapQuanLy };
    form.reset(
      {
        ...danhMucCapQuanLyRawValue,
        id: { value: danhMucCapQuanLyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucCapQuanLyFormDefaults {
    return {
      id: null,
    };
  }
}
