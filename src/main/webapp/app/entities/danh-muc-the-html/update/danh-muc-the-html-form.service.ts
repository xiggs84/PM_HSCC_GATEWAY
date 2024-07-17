import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDanhMucTheHtml, NewDanhMucTheHtml } from '../danh-muc-the-html.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDanhMucTheHtml for edit and NewDanhMucTheHtmlFormGroupInput for create.
 */
type DanhMucTheHtmlFormGroupInput = IDanhMucTheHtml | PartialWithRequiredKeyOf<NewDanhMucTheHtml>;

type DanhMucTheHtmlFormDefaults = Pick<NewDanhMucTheHtml, 'id'>;

type DanhMucTheHtmlFormGroupContent = {
  id: FormControl<IDanhMucTheHtml['id'] | NewDanhMucTheHtml['id']>;
  idType: FormControl<IDanhMucTheHtml['idType']>;
  type: FormControl<IDanhMucTheHtml['type']>;
  dienGiai: FormControl<IDanhMucTheHtml['dienGiai']>;
};

export type DanhMucTheHtmlFormGroup = FormGroup<DanhMucTheHtmlFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DanhMucTheHtmlFormService {
  createDanhMucTheHtmlFormGroup(danhMucTheHtml: DanhMucTheHtmlFormGroupInput = { id: null }): DanhMucTheHtmlFormGroup {
    const danhMucTheHtmlRawValue = {
      ...this.getFormDefaults(),
      ...danhMucTheHtml,
    };
    return new FormGroup<DanhMucTheHtmlFormGroupContent>({
      id: new FormControl(
        { value: danhMucTheHtmlRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idType: new FormControl(danhMucTheHtmlRawValue.idType),
      type: new FormControl(danhMucTheHtmlRawValue.type),
      dienGiai: new FormControl(danhMucTheHtmlRawValue.dienGiai),
    });
  }

  getDanhMucTheHtml(form: DanhMucTheHtmlFormGroup): IDanhMucTheHtml | NewDanhMucTheHtml {
    return form.getRawValue() as IDanhMucTheHtml | NewDanhMucTheHtml;
  }

  resetForm(form: DanhMucTheHtmlFormGroup, danhMucTheHtml: DanhMucTheHtmlFormGroupInput): void {
    const danhMucTheHtmlRawValue = { ...this.getFormDefaults(), ...danhMucTheHtml };
    form.reset(
      {
        ...danhMucTheHtmlRawValue,
        id: { value: danhMucTheHtmlRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DanhMucTheHtmlFormDefaults {
    return {
      id: null,
    };
  }
}
