import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../menu-quyen.test-samples';

import { MenuQuyenFormService } from './menu-quyen-form.service';

describe('MenuQuyen Form Service', () => {
  let service: MenuQuyenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuQuyenFormService);
  });

  describe('Service methods', () => {
    describe('createMenuQuyenFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMenuQuyenFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuyen: expect.any(Object),
            idDonVi: expect.any(Object),
            listMenu: expect.any(Object),
          }),
        );
      });

      it('passing IMenuQuyen should create a new form with FormGroup', () => {
        const formGroup = service.createMenuQuyenFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuyen: expect.any(Object),
            idDonVi: expect.any(Object),
            listMenu: expect.any(Object),
          }),
        );
      });
    });

    describe('getMenuQuyen', () => {
      it('should return NewMenuQuyen for default MenuQuyen initial value', () => {
        const formGroup = service.createMenuQuyenFormGroup(sampleWithNewData);

        const menuQuyen = service.getMenuQuyen(formGroup) as any;

        expect(menuQuyen).toMatchObject(sampleWithNewData);
      });

      it('should return NewMenuQuyen for empty MenuQuyen initial value', () => {
        const formGroup = service.createMenuQuyenFormGroup();

        const menuQuyen = service.getMenuQuyen(formGroup) as any;

        expect(menuQuyen).toMatchObject({});
      });

      it('should return IMenuQuyen', () => {
        const formGroup = service.createMenuQuyenFormGroup(sampleWithRequiredData);

        const menuQuyen = service.getMenuQuyen(formGroup) as any;

        expect(menuQuyen).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMenuQuyen should not enable id FormControl', () => {
        const formGroup = service.createMenuQuyenFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMenuQuyen should disable id FormControl', () => {
        const formGroup = service.createMenuQuyenFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
