import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHdccCoTien, NewHdccCoTien } from '../hdcc-co-tien.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHdccCoTien for edit and NewHdccCoTienFormGroupInput for create.
 */
type HdccCoTienFormGroupInput = IHdccCoTien | PartialWithRequiredKeyOf<NewHdccCoTien>;

type HdccCoTienFormDefaults = Pick<NewHdccCoTien, 'id'>;

type HdccCoTienFormGroupContent = {
  id: FormControl<IHdccCoTien['id'] | NewHdccCoTien['id']>;
  idMaster: FormControl<IHdccCoTien['idMaster']>;
  soCongChung: FormControl<IHdccCoTien['soCongChung']>;
  soTienRutTrich: FormControl<IHdccCoTien['soTienRutTrich']>;
};

export type HdccCoTienFormGroup = FormGroup<HdccCoTienFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HdccCoTienFormService {
  createHdccCoTienFormGroup(hdccCoTien: HdccCoTienFormGroupInput = { id: null }): HdccCoTienFormGroup {
    const hdccCoTienRawValue = {
      ...this.getFormDefaults(),
      ...hdccCoTien,
    };
    return new FormGroup<HdccCoTienFormGroupContent>({
      id: new FormControl(
        { value: hdccCoTienRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idMaster: new FormControl(hdccCoTienRawValue.idMaster),
      soCongChung: new FormControl(hdccCoTienRawValue.soCongChung),
      soTienRutTrich: new FormControl(hdccCoTienRawValue.soTienRutTrich),
    });
  }

  getHdccCoTien(form: HdccCoTienFormGroup): IHdccCoTien | NewHdccCoTien {
    return form.getRawValue() as IHdccCoTien | NewHdccCoTien;
  }

  resetForm(form: HdccCoTienFormGroup, hdccCoTien: HdccCoTienFormGroupInput): void {
    const hdccCoTienRawValue = { ...this.getFormDefaults(), ...hdccCoTien };
    form.reset(
      {
        ...hdccCoTienRawValue,
        id: { value: hdccCoTienRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HdccCoTienFormDefaults {
    return {
      id: null,
    };
  }
}
