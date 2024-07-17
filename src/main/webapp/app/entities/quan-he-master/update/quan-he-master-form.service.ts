import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuanHeMaster, NewQuanHeMaster } from '../quan-he-master.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuanHeMaster for edit and NewQuanHeMasterFormGroupInput for create.
 */
type QuanHeMasterFormGroupInput = IQuanHeMaster | PartialWithRequiredKeyOf<NewQuanHeMaster>;

type QuanHeMasterFormDefaults = Pick<NewQuanHeMaster, 'id'>;

type QuanHeMasterFormGroupContent = {
  id: FormControl<IQuanHeMaster['id'] | NewQuanHeMaster['id']>;
  idDuongSu: FormControl<IQuanHeMaster['idDuongSu']>;
  idDuongSuQh: FormControl<IQuanHeMaster['idDuongSuQh']>;
};

export type QuanHeMasterFormGroup = FormGroup<QuanHeMasterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuanHeMasterFormService {
  createQuanHeMasterFormGroup(quanHeMaster: QuanHeMasterFormGroupInput = { id: null }): QuanHeMasterFormGroup {
    const quanHeMasterRawValue = {
      ...this.getFormDefaults(),
      ...quanHeMaster,
    };
    return new FormGroup<QuanHeMasterFormGroupContent>({
      id: new FormControl(
        { value: quanHeMasterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idDuongSu: new FormControl(quanHeMasterRawValue.idDuongSu),
      idDuongSuQh: new FormControl(quanHeMasterRawValue.idDuongSuQh),
    });
  }

  getQuanHeMaster(form: QuanHeMasterFormGroup): IQuanHeMaster | NewQuanHeMaster {
    return form.getRawValue() as IQuanHeMaster | NewQuanHeMaster;
  }

  resetForm(form: QuanHeMasterFormGroup, quanHeMaster: QuanHeMasterFormGroupInput): void {
    const quanHeMasterRawValue = { ...this.getFormDefaults(), ...quanHeMaster };
    form.reset(
      {
        ...quanHeMasterRawValue,
        id: { value: quanHeMasterRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuanHeMasterFormDefaults {
    return {
      id: null,
    };
  }
}
