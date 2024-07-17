import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INoiCapGttt, NewNoiCapGttt } from '../noi-cap-gttt.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INoiCapGttt for edit and NewNoiCapGtttFormGroupInput for create.
 */
type NoiCapGtttFormGroupInput = INoiCapGttt | PartialWithRequiredKeyOf<NewNoiCapGttt>;

type NoiCapGtttFormDefaults = Pick<NewNoiCapGttt, 'id'>;

type NoiCapGtttFormGroupContent = {
  id: FormControl<INoiCapGttt['id'] | NewNoiCapGttt['id']>;
  idNoiCap: FormControl<INoiCapGttt['idNoiCap']>;
  dienGiai: FormControl<INoiCapGttt['dienGiai']>;
  idDonVi: FormControl<INoiCapGttt['idDonVi']>;
  trangThai: FormControl<INoiCapGttt['trangThai']>;
};

export type NoiCapGtttFormGroup = FormGroup<NoiCapGtttFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NoiCapGtttFormService {
  createNoiCapGtttFormGroup(noiCapGttt: NoiCapGtttFormGroupInput = { id: null }): NoiCapGtttFormGroup {
    const noiCapGtttRawValue = {
      ...this.getFormDefaults(),
      ...noiCapGttt,
    };
    return new FormGroup<NoiCapGtttFormGroupContent>({
      id: new FormControl(
        { value: noiCapGtttRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idNoiCap: new FormControl(noiCapGtttRawValue.idNoiCap),
      dienGiai: new FormControl(noiCapGtttRawValue.dienGiai),
      idDonVi: new FormControl(noiCapGtttRawValue.idDonVi),
      trangThai: new FormControl(noiCapGtttRawValue.trangThai),
    });
  }

  getNoiCapGttt(form: NoiCapGtttFormGroup): INoiCapGttt | NewNoiCapGttt {
    return form.getRawValue() as INoiCapGttt | NewNoiCapGttt;
  }

  resetForm(form: NoiCapGtttFormGroup, noiCapGttt: NoiCapGtttFormGroupInput): void {
    const noiCapGtttRawValue = { ...this.getFormDefaults(), ...noiCapGttt };
    form.reset(
      {
        ...noiCapGtttRawValue,
        id: { value: noiCapGtttRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NoiCapGtttFormDefaults {
    return {
      id: null,
    };
  }
}
