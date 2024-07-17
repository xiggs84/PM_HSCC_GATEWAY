import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../hd-master-co-ccv.test-samples';

import { HdMasterCoCcvFormService } from './hd-master-co-ccv-form.service';

describe('HdMasterCoCcv Form Service', () => {
  let service: HdMasterCoCcvFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HdMasterCoCcvFormService);
  });

  describe('Service methods', () => {
    describe('createHdMasterCoCcvFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHdMasterCoCcvFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            repRefUnique: expect.any(Object),
            persCode: expect.any(Object),
            ldUnique: expect.any(Object),
            tenCanBo: expect.any(Object),
            idCanBo: expect.any(Object),
          }),
        );
      });

      it('passing IHdMasterCoCcv should create a new form with FormGroup', () => {
        const formGroup = service.createHdMasterCoCcvFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            repRefUnique: expect.any(Object),
            persCode: expect.any(Object),
            ldUnique: expect.any(Object),
            tenCanBo: expect.any(Object),
            idCanBo: expect.any(Object),
          }),
        );
      });
    });

    describe('getHdMasterCoCcv', () => {
      it('should return NewHdMasterCoCcv for default HdMasterCoCcv initial value', () => {
        const formGroup = service.createHdMasterCoCcvFormGroup(sampleWithNewData);

        const hdMasterCoCcv = service.getHdMasterCoCcv(formGroup) as any;

        expect(hdMasterCoCcv).toMatchObject(sampleWithNewData);
      });

      it('should return NewHdMasterCoCcv for empty HdMasterCoCcv initial value', () => {
        const formGroup = service.createHdMasterCoCcvFormGroup();

        const hdMasterCoCcv = service.getHdMasterCoCcv(formGroup) as any;

        expect(hdMasterCoCcv).toMatchObject({});
      });

      it('should return IHdMasterCoCcv', () => {
        const formGroup = service.createHdMasterCoCcvFormGroup(sampleWithRequiredData);

        const hdMasterCoCcv = service.getHdMasterCoCcv(formGroup) as any;

        expect(hdMasterCoCcv).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHdMasterCoCcv should not enable id FormControl', () => {
        const formGroup = service.createHdMasterCoCcvFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHdMasterCoCcv should disable id FormControl', () => {
        const formGroup = service.createHdMasterCoCcvFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
