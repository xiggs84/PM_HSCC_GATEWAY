import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMenuQuyen, NewMenuQuyen } from '../menu-quyen.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMenuQuyen for edit and NewMenuQuyenFormGroupInput for create.
 */
type MenuQuyenFormGroupInput = IMenuQuyen | PartialWithRequiredKeyOf<NewMenuQuyen>;

type MenuQuyenFormDefaults = Pick<NewMenuQuyen, 'id'>;

type MenuQuyenFormGroupContent = {
  id: FormControl<IMenuQuyen['id'] | NewMenuQuyen['id']>;
  idQuyen: FormControl<IMenuQuyen['idQuyen']>;
  idDonVi: FormControl<IMenuQuyen['idDonVi']>;
  listMenu: FormControl<IMenuQuyen['listMenu']>;
};

export type MenuQuyenFormGroup = FormGroup<MenuQuyenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MenuQuyenFormService {
  createMenuQuyenFormGroup(menuQuyen: MenuQuyenFormGroupInput = { id: null }): MenuQuyenFormGroup {
    const menuQuyenRawValue = {
      ...this.getFormDefaults(),
      ...menuQuyen,
    };
    return new FormGroup<MenuQuyenFormGroupContent>({
      id: new FormControl(
        { value: menuQuyenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      idQuyen: new FormControl(menuQuyenRawValue.idQuyen),
      idDonVi: new FormControl(menuQuyenRawValue.idDonVi),
      listMenu: new FormControl(menuQuyenRawValue.listMenu),
    });
  }

  getMenuQuyen(form: MenuQuyenFormGroup): IMenuQuyen | NewMenuQuyen {
    return form.getRawValue() as IMenuQuyen | NewMenuQuyen;
  }

  resetForm(form: MenuQuyenFormGroup, menuQuyen: MenuQuyenFormGroupInput): void {
    const menuQuyenRawValue = { ...this.getFormDefaults(), ...menuQuyen };
    form.reset(
      {
        ...menuQuyenRawValue,
        id: { value: menuQuyenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MenuQuyenFormDefaults {
    return {
      id: null,
    };
  }
}
