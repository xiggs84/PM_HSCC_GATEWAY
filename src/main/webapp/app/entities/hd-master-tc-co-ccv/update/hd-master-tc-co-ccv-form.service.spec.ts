import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../hd-master-tc-co-ccv.test-samples';

import { HdMasterTcCoCcvFormService } from './hd-master-tc-co-ccv-form.service';

describe('HdMasterTcCoCcv Form Service', () => {
  let service: HdMasterTcCoCcvFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HdMasterTcCoCcvFormService);
  });

  describe('Service methods', () => {
    describe('createHdMasterTcCoCcvFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHdMasterTcCoCcvFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            repRefUnique: expect.any(Object),
            persCode: expect.any(Object),
            tenCanBo: expect.any(Object),
            idCanBo: expect.any(Object),
          }),
        );
      });

      it('passing IHdMasterTcCoCcv should create a new form with FormGroup', () => {
        const formGroup = service.createHdMasterTcCoCcvFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            repRefUnique: expect.any(Object),
            persCode: expect.any(Object),
            tenCanBo: expect.any(Object),
            idCanBo: expect.any(Object),
          }),
        );
      });
    });

    describe('getHdMasterTcCoCcv', () => {
      it('should return NewHdMasterTcCoCcv for default HdMasterTcCoCcv initial value', () => {
        const formGroup = service.createHdMasterTcCoCcvFormGroup(sampleWithNewData);

        const hdMasterTcCoCcv = service.getHdMasterTcCoCcv(formGroup) as any;

        expect(hdMasterTcCoCcv).toMatchObject(sampleWithNewData);
      });

      it('should return NewHdMasterTcCoCcv for empty HdMasterTcCoCcv initial value', () => {
        const formGroup = service.createHdMasterTcCoCcvFormGroup();

        const hdMasterTcCoCcv = service.getHdMasterTcCoCcv(formGroup) as any;

        expect(hdMasterTcCoCcv).toMatchObject({});
      });

      it('should return IHdMasterTcCoCcv', () => {
        const formGroup = service.createHdMasterTcCoCcvFormGroup(sampleWithRequiredData);

        const hdMasterTcCoCcv = service.getHdMasterTcCoCcv(formGroup) as any;

        expect(hdMasterTcCoCcv).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHdMasterTcCoCcv should not enable id FormControl', () => {
        const formGroup = service.createHdMasterTcCoCcvFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHdMasterTcCoCcv should disable id FormControl', () => {
        const formGroup = service.createHdMasterTcCoCcvFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
