import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucKeyDongTuFaq, NewDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucKeyDongTuFaq for edit and NewDanhMucKeyDongTuFaqFormGroupInput for create.
 */
type DanhMucKeyDongTuFaqFormGroupInput = IDanhMucKeyDongTuFaq | PartialWithRequiredKeyOf<NewDanhMucKeyDongTuFaq>;

type DanhMucKeyDongTuFaqFormDefaults = Pick<NewDanhMucKeyDongTuFaq, 'id'>;

type DanhMucKeyDongTuFaqFormGroupContent = {
  id: FormControl<IDanhMucKeyDongTuFaq['id'] | NewDanhMucKeyDongTuFaq['id']>;
  idCauHoi: FormControl<IDanhMucKeyDongTuFaq['idCauHoi']>;
  keyDongTu: FormControl<IDanhMucKeyDongTuFaq['keyDongTu']>;
};

export type DanhMucKeyDongTuFaqFormGroup = FormGroup<DanhMucKeyDongTuFaqFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucKeyDongTuFaqFormService {
  createDanhMucKeyDongTuFaqFormGroup(danhMucKeyDongTuFaq: DanhMucKeyDongTuFaqFormGroupInput = { id: null }): DanhMucKeyDongTuFaqFormGroup {
    const danhMucKeyDongTuFaqRawValue = {
      ...this.getFormDefaults(),
      ...danhMucKeyDongTuFaq,
    };
    return new FormGroup<DanhMucKeyDongTuFaqFormGroupContent>({
      id: new FormControl(
        { value: danhMucKeyDongTuFaqRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idCauHoi: new FormControl(danhMucKeyDongTuFaqRawValue.idCauHoi),
      keyDongTu: new FormControl(danhMucKeyDongTuFaqRawValue.keyDongTu),
    });
  }

  getDanhMucKeyDongTuFaq(form: DanhMucKeyDongTuFaqFormGroup): IDanhMucKeyDongTuFaq | NewDanhMucKeyDongTuFaq {
    return form.getRawValue() as IDanhMucKeyDongTuFaq | NewDanhMucKeyDongTuFaq;
  }

  resetForm(form: DanhMucKeyDongTuFaqFormGroup, danhMucKeyDongTuFaq: DanhMucKeyDongTuFaqFormGroupInput): void {
    const danhMucKeyDongTuFaqRawValue = { ...this.getFormDefaults(), ...danhMucKeyDongTuFaq };
    form.reset(
      {
        ...danhMucKeyDongTuFaqRawValue,
        id: { value: danhMucKeyDongTuFaqRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucKeyDongTuFaqFormDefaults {
    return {
      id: null,
    };
  }
}
