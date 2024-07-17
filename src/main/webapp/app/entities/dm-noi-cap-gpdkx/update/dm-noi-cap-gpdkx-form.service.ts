import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDmNoiCapGpdkx, NewDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDmNoiCapGpdkx for edit and NewDmNoiCapGpdkxFormGroupInput for create.
 */
type DmNoiCapGpdkxFormGroupInput = IDmNoiCapGpdkx | PartialWithRequiredKeyOf<NewDmNoiCapGpdkx>;

type DmNoiCapGpdkxFormDefaults = Pick<NewDmNoiCapGpdkx, 'id'>;

type DmNoiCapGpdkxFormGroupContent = {
  id: FormControl<IDmNoiCapGpdkx['id'] | NewDmNoiCapGpdkx['id']>;
  idNoiCap: FormControl<IDmNoiCapGpdkx['idNoiCap']>;
  dienGiai: FormControl<IDmNoiCapGpdkx['dienGiai']>;
  idDonVi: FormControl<IDmNoiCapGpdkx['idDonVi']>;
  trangThai: FormControl<IDmNoiCapGpdkx['trangThai']>;
};

export type DmNoiCapGpdkxFormGroup = FormGroup<DmNoiCapGpdkxFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DmNoiCapGpdkxFormService {
  createDmNoiCapGpdkxFormGroup(dmNoiCapGpdkx: DmNoiCapGpdkxFormGroupInput = { id: null }): DmNoiCapGpdkxFormGroup {
    const dmNoiCapGpdkxRawValue = {
      ...this.getFormDefaults(),
      ...dmNoiCapGpdkx,
    };
    return new FormGroup<DmNoiCapGpdkxFormGroupContent>({
      id: new FormControl(
        { value: dmNoiCapGpdkxRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idNoiCap: new FormControl(dmNoiCapGpdkxRawValue.idNoiCap),
      dienGiai: new FormControl(dmNoiCapGpdkxRawValue.dienGiai),
      idDonVi: new FormControl(dmNoiCapGpdkxRawValue.idDonVi),
      trangThai: new FormControl(dmNoiCapGpdkxRawValue.trangThai),
    });
  }

  getDmNoiCapGpdkx(form: DmNoiCapGpdkxFormGroup): IDmNoiCapGpdkx | NewDmNoiCapGpdkx {
    return form.getRawValue() as IDmNoiCapGpdkx | NewDmNoiCapGpdkx;
  }

  resetForm(form: DmNoiCapGpdkxFormGroup, dmNoiCapGpdkx: DmNoiCapGpdkxFormGroupInput): void {
    const dmNoiCapGpdkxRawValue = { ...this.getFormDefaults(), ...dmNoiCapGpdkx };
    form.reset(
      {
        ...dmNoiCapGpdkxRawValue,
        id: { value: dmNoiCapGpdkxRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DmNoiCapGpdkxFormDefaults {
    return {
      id: null,
    };
  }
}
