import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-ngon-ngu.test-samples';

import { DanhMucNgonNguFormService } from './danh-muc-ngon-ngu-form.service';

describe('DanhMucNgonNgu Form Service', () => {
  let service: DanhMucNgonNguFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucNgonNguFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucNgonNguFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucNgonNguFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNgonNgu: expect.any(Object),
            dienGiai: expect.any(Object),
            vietTat: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucNgonNgu should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucNgonNguFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNgonNgu: expect.any(Object),
            dienGiai: expect.any(Object),
            vietTat: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucNgonNgu', () => {
      it('should return NewDanhMucNgonNgu for default DanhMucNgonNgu initial value', () => {
        const formGroup = service.createDanhMucNgonNguFormGroup(sampleWithNewData);

        const danhMucNgonNgu = service.getDanhMucNgonNgu(formGroup) as any;

        expect(danhMucNgonNgu).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucNgonNgu for empty DanhMucNgonNgu initial value', () => {
        const formGroup = service.createDanhMucNgonNguFormGroup();

        const danhMucNgonNgu = service.getDanhMucNgonNgu(formGroup) as any;

        expect(danhMucNgonNgu).toMatchObject({});
      });

      it('should return IDanhMucNgonNgu', () => {
        const formGroup = service.createDanhMucNgonNguFormGroup(sampleWithRequiredData);

        const danhMucNgonNgu = service.getDanhMucNgonNgu(formGroup) as any;

        expect(danhMucNgonNgu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucNgonNgu should not enable id FormControl', () => {
        const formGroup = service.createDanhMucNgonNguFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucNgonNgu should disable id FormControl', () => {
        const formGroup = service.createDanhMucNgonNguFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
