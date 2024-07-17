import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhsachDsNganchanTmp } from '../danhsach-ds-nganchan-tmp.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danhsach-ds-nganchan-tmp.test-samples';

import { DanhsachDsNganchanTmpService, RestDanhsachDsNganchanTmp } from './danhsach-ds-nganchan-tmp.service';

const requireRestSample: RestDanhsachDsNganchanTmp = {
  ...sampleWithRequiredData,
  ngayNganChan: sampleWithRequiredData.ngayNganChan?.format(DATE_FORMAT),
};

describe('DanhsachDsNganchanTmp Service', () => {
  let service: DanhsachDsNganchanTmpService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhsachDsNganchanTmp | IDanhsachDsNganchanTmp[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhsachDsNganchanTmpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a DanhsachDsNganchanTmp', () => {
      const danhsachDsNganchanTmp = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhsachDsNganchanTmp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhsachDsNganchanTmp', () => {
      const danhsachDsNganchanTmp = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhsachDsNganchanTmp).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhsachDsNganchanTmp', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhsachDsNganchanTmp', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhsachDsNganchanTmp', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhsachDsNganchanTmpToCollectionIfMissing', () => {
      it('should add a DanhsachDsNganchanTmp to an empty array', () => {
        const danhsachDsNganchanTmp: IDanhsachDsNganchanTmp = sampleWithRequiredData;
        expectedResult = service.addDanhsachDsNganchanTmpToCollectionIfMissing([], danhsachDsNganchanTmp);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhsachDsNganchanTmp);
      });

      it('should not add a DanhsachDsNganchanTmp to an array that contains it', () => {
        const danhsachDsNganchanTmp: IDanhsachDsNganchanTmp = sampleWithRequiredData;
        const danhsachDsNganchanTmpCollection: IDanhsachDsNganchanTmp[] = [
          {
            ...danhsachDsNganchanTmp,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhsachDsNganchanTmpToCollectionIfMissing(danhsachDsNganchanTmpCollection, danhsachDsNganchanTmp);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhsachDsNganchanTmp to an array that doesn't contain it", () => {
        const danhsachDsNganchanTmp: IDanhsachDsNganchanTmp = sampleWithRequiredData;
        const danhsachDsNganchanTmpCollection: IDanhsachDsNganchanTmp[] = [sampleWithPartialData];
        expectedResult = service.addDanhsachDsNganchanTmpToCollectionIfMissing(danhsachDsNganchanTmpCollection, danhsachDsNganchanTmp);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhsachDsNganchanTmp);
      });

      it('should add only unique DanhsachDsNganchanTmp to an array', () => {
        const danhsachDsNganchanTmpArray: IDanhsachDsNganchanTmp[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhsachDsNganchanTmpCollection: IDanhsachDsNganchanTmp[] = [sampleWithRequiredData];
        expectedResult = service.addDanhsachDsNganchanTmpToCollectionIfMissing(
          danhsachDsNganchanTmpCollection,
          ...danhsachDsNganchanTmpArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhsachDsNganchanTmp: IDanhsachDsNganchanTmp = sampleWithRequiredData;
        const danhsachDsNganchanTmp2: IDanhsachDsNganchanTmp = sampleWithPartialData;
        expectedResult = service.addDanhsachDsNganchanTmpToCollectionIfMissing([], danhsachDsNganchanTmp, danhsachDsNganchanTmp2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhsachDsNganchanTmp);
        expect(expectedResult).toContain(danhsachDsNganchanTmp2);
      });

      it('should accept null and undefined values', () => {
        const danhsachDsNganchanTmp: IDanhsachDsNganchanTmp = sampleWithRequiredData;
        expectedResult = service.addDanhsachDsNganchanTmpToCollectionIfMissing([], null, danhsachDsNganchanTmp, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhsachDsNganchanTmp);
      });

      it('should return initial array if no DanhsachDsNganchanTmp is added', () => {
        const danhsachDsNganchanTmpCollection: IDanhsachDsNganchanTmp[] = [sampleWithRequiredData];
        expectedResult = service.addDanhsachDsNganchanTmpToCollectionIfMissing(danhsachDsNganchanTmpCollection, undefined, null);
        expect(expectedResult).toEqual(danhsachDsNganchanTmpCollection);
      });
    });

    describe('compareDanhsachDsNganchanTmp', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhsachDsNganchanTmp(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhsachDsNganchanTmp(entity1, entity2);
        const compareResult2 = service.compareDanhsachDsNganchanTmp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhsachDsNganchanTmp(entity1, entity2);
        const compareResult2 = service.compareDanhsachDsNganchanTmp(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhsachDsNganchanTmp(entity1, entity2);
        const compareResult2 = service.compareDanhsachDsNganchanTmp(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
