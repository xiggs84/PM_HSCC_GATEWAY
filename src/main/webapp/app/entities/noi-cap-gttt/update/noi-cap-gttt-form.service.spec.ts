import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../noi-cap-gttt.test-samples';

import { NoiCapGtttFormService } from './noi-cap-gttt-form.service';

describe('NoiCapGttt Form Service', () => {
  let service: NoiCapGtttFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoiCapGtttFormService);
  });

  describe('Service methods', () => {
    describe('createNoiCapGtttFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNoiCapGtttFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNoiCap: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing INoiCapGttt should create a new form with FormGroup', () => {
        const formGroup = service.createNoiCapGtttFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNoiCap: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getNoiCapGttt', () => {
      it('should return NewNoiCapGttt for default NoiCapGttt initial value', () => {
        const formGroup = service.createNoiCapGtttFormGroup(sampleWithNewData);

        const noiCapGttt = service.getNoiCapGttt(formGroup) as any;

        expect(noiCapGttt).toMatchObject(sampleWithNewData);
      });

      it('should return NewNoiCapGttt for empty NoiCapGttt initial value', () => {
        const formGroup = service.createNoiCapGtttFormGroup();

        const noiCapGttt = service.getNoiCapGttt(formGroup) as any;

        expect(noiCapGttt).toMatchObject({});
      });

      it('should return INoiCapGttt', () => {
        const formGroup = service.createNoiCapGtttFormGroup(sampleWithRequiredData);

        const noiCapGttt = service.getNoiCapGttt(formGroup) as any;

        expect(noiCapGttt).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INoiCapGttt should not enable id FormControl', () => {
        const formGroup = service.createNoiCapGtttFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNoiCapGttt should disable id FormControl', () => {
        const formGroup = service.createNoiCapGtttFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
