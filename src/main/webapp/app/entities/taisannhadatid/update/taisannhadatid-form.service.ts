import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaisannhadatid, NewTaisannhadatid } from '../taisannhadatid.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaisannhadatid for edit and NewTaisannhadatidFormGroupInput for create.
 */
type TaisannhadatidFormGroupInput = ITaisannhadatid | PartialWithRequiredKeyOf<NewTaisannhadatid>;

type TaisannhadatidFormDefaults = Pick<NewTaisannhadatid, 'id'>;

type TaisannhadatidFormGroupContent = {
  id: FormControl<ITaisannhadatid['id'] | NewTaisannhadatid['id']>;
  idTaiSan: FormControl<ITaisannhadatid['idTaiSan']>;
  thongTinTs: FormControl<ITaisannhadatid['thongTinTs']>;
};

export type TaisannhadatidFormGroup = FormGroup<TaisannhadatidFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaisannhadatidFormService {
  createTaisannhadatidFormGroup(taisannhadatid: TaisannhadatidFormGroupInput = { id: null }): TaisannhadatidFormGroup {
    const taisannhadatidRawValue = {
      ...this.getFormDefaults(),
      ...taisannhadatid,
    };
    return new FormGroup<TaisannhadatidFormGroupContent>({
      id: new FormControl(
        { value: taisannhadatidRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idTaiSan: new FormControl(taisannhadatidRawValue.idTaiSan),
      thongTinTs: new FormControl(taisannhadatidRawValue.thongTinTs),
    });
  }

  getTaisannhadatid(form: TaisannhadatidFormGroup): ITaisannhadatid | NewTaisannhadatid {
    return form.getRawValue() as ITaisannhadatid | NewTaisannhadatid;
  }

  resetForm(form: TaisannhadatidFormGroup, taisannhadatid: TaisannhadatidFormGroupInput): void {
    const taisannhadatidRawValue = { ...this.getFormDefaults(), ...taisannhadatid };
    form.reset(
      {
        ...taisannhadatidRawValue,
        id: { value: taisannhadatidRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaisannhadatidFormDefaults {
    return {
      id: null,
    };
  }
}
