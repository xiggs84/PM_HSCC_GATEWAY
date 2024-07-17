import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucFaq, NewDanhMucFaq } from '../danh-muc-faq.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucFaq for edit and NewDanhMucFaqFormGroupInput for create.
 */
type DanhMucFaqFormGroupInput = IDanhMucFaq | PartialWithRequiredKeyOf<NewDanhMucFaq>;

type DanhMucFaqFormDefaults = Pick<NewDanhMucFaq, 'id'>;

type DanhMucFaqFormGroupContent = {
  id: FormControl<IDanhMucFaq['id'] | NewDanhMucFaq['id']>;
  idCauHoi: FormControl<IDanhMucFaq['idCauHoi']>;
  noiDung: FormControl<IDanhMucFaq['noiDung']>;
  cauTraLoi: FormControl<IDanhMucFaq['cauTraLoi']>;
  loai: FormControl<IDanhMucFaq['loai']>;
};

export type DanhMucFaqFormGroup = FormGroup<DanhMucFaqFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucFaqFormService {
  createDanhMucFaqFormGroup(danhMucFaq: DanhMucFaqFormGroupInput = { id: null }): DanhMucFaqFormGroup {
    const danhMucFaqRawValue = {
      ...this.getFormDefaults(),
      ...danhMucFaq,
    };
    return new FormGroup<DanhMucFaqFormGroupContent>({
      id: new FormControl(
        { value: danhMucFaqRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idCauHoi: new FormControl(danhMucFaqRawValue.idCauHoi),
      noiDung: new FormControl(danhMucFaqRawValue.noiDung),
      cauTraLoi: new FormControl(danhMucFaqRawValue.cauTraLoi),
      loai: new FormControl(danhMucFaqRawValue.loai),
    });
  }

  getDanhMucFaq(form: DanhMucFaqFormGroup): IDanhMucFaq | NewDanhMucFaq {
    return form.getRawValue() as IDanhMucFaq | NewDanhMucFaq;
  }

  resetForm(form: DanhMucFaqFormGroup, danhMucFaq: DanhMucFaqFormGroupInput): void {
    const danhMucFaqRawValue = { ...this.getFormDefaults(), ...danhMucFaq };
    form.reset(
      {
        ...danhMucFaqRawValue,
        id: { value: danhMucFaqRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucFaqFormDefaults {
    return {
      id: null,
    };
  }
}
