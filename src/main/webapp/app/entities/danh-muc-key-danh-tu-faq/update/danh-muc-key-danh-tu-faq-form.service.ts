import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucKeyDanhTuFaq, NewDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucKeyDanhTuFaq for edit and NewDanhMucKeyDanhTuFaqFormGroupInput for create.
 */
type DanhMucKeyDanhTuFaqFormGroupInput = IDanhMucKeyDanhTuFaq | PartialWithRequiredKeyOf<NewDanhMucKeyDanhTuFaq>;

type DanhMucKeyDanhTuFaqFormDefaults = Pick<NewDanhMucKeyDanhTuFaq, 'id'>;

type DanhMucKeyDanhTuFaqFormGroupContent = {
  id: FormControl<IDanhMucKeyDanhTuFaq['id'] | NewDanhMucKeyDanhTuFaq['id']>;
  idCauHoi: FormControl<IDanhMucKeyDanhTuFaq['idCauHoi']>;
  keyDanhTu: FormControl<IDanhMucKeyDanhTuFaq['keyDanhTu']>;
};

export type DanhMucKeyDanhTuFaqFormGroup = FormGroup<DanhMucKeyDanhTuFaqFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucKeyDanhTuFaqFormService {
  createDanhMucKeyDanhTuFaqFormGroup(danhMucKeyDanhTuFaq: DanhMucKeyDanhTuFaqFormGroupInput = { id: null }): DanhMucKeyDanhTuFaqFormGroup {
    const danhMucKeyDanhTuFaqRawValue = {
      ...this.getFormDefaults(),
      ...danhMucKeyDanhTuFaq,
    };
    return new FormGroup<DanhMucKeyDanhTuFaqFormGroupContent>({
      id: new FormControl(
        { value: danhMucKeyDanhTuFaqRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idCauHoi: new FormControl(danhMucKeyDanhTuFaqRawValue.idCauHoi),
      keyDanhTu: new FormControl(danhMucKeyDanhTuFaqRawValue.keyDanhTu),
    });
  }

  getDanhMucKeyDanhTuFaq(form: DanhMucKeyDanhTuFaqFormGroup): IDanhMucKeyDanhTuFaq | NewDanhMucKeyDanhTuFaq {
    return form.getRawValue() as IDanhMucKeyDanhTuFaq | NewDanhMucKeyDanhTuFaq;
  }

  resetForm(form: DanhMucKeyDanhTuFaqFormGroup, danhMucKeyDanhTuFaq: DanhMucKeyDanhTuFaqFormGroupInput): void {
    const danhMucKeyDanhTuFaqRawValue = { ...this.getFormDefaults(), ...danhMucKeyDanhTuFaq };
    form.reset(
      {
        ...danhMucKeyDanhTuFaqRawValue,
        id: { value: danhMucKeyDanhTuFaqRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucKeyDanhTuFaqFormDefaults {
    return {
      id: null,
    };
  }
}
