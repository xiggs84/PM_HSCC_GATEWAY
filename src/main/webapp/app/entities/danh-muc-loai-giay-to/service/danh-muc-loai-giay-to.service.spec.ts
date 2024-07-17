import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-loai-giay-to.test-samples';

import { DanhMucLoaiGiayToService } from './danh-muc-loai-giay-to.service';

const requireRestSample: IDanhMucLoaiGiayTo = {
  ...sampleWithRequiredData,
};

describe('DanhMucLoaiGiayTo Service', () => {
  let service: DanhMucLoaiGiayToService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiGiayTo | IDanhMucLoaiGiayTo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiGiayToService);
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

    it('should create a DanhMucLoaiGiayTo', () => {
      const danhMucLoaiGiayTo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiGiayTo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiGiayTo', () => {
      const danhMucLoaiGiayTo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiGiayTo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiGiayTo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiGiayTo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiGiayTo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiGiayToToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiGiayTo to an empty array', () => {
        const danhMucLoaiGiayTo: IDanhMucLoaiGiayTo = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiGiayToToCollectionIfMissing([], danhMucLoaiGiayTo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiGiayTo);
      });

      it('should not add a DanhMucLoaiGiayTo to an array that contains it', () => {
        const danhMucLoaiGiayTo: IDanhMucLoaiGiayTo = sampleWithRequiredData;
        const danhMucLoaiGiayToCollection: IDanhMucLoaiGiayTo[] = [
          {
            ...danhMucLoaiGiayTo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiGiayToToCollectionIfMissing(danhMucLoaiGiayToCollection, danhMucLoaiGiayTo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiGiayTo to an array that doesn't contain it", () => {
        const danhMucLoaiGiayTo: IDanhMucLoaiGiayTo = sampleWithRequiredData;
        const danhMucLoaiGiayToCollection: IDanhMucLoaiGiayTo[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiGiayToToCollectionIfMissing(danhMucLoaiGiayToCollection, danhMucLoaiGiayTo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiGiayTo);
      });

      it('should add only unique DanhMucLoaiGiayTo to an array', () => {
        const danhMucLoaiGiayToArray: IDanhMucLoaiGiayTo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucLoaiGiayToCollection: IDanhMucLoaiGiayTo[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiGiayToToCollectionIfMissing(danhMucLoaiGiayToCollection, ...danhMucLoaiGiayToArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiGiayTo: IDanhMucLoaiGiayTo = sampleWithRequiredData;
        const danhMucLoaiGiayTo2: IDanhMucLoaiGiayTo = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiGiayToToCollectionIfMissing([], danhMucLoaiGiayTo, danhMucLoaiGiayTo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiGiayTo);
        expect(expectedResult).toContain(danhMucLoaiGiayTo2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiGiayTo: IDanhMucLoaiGiayTo = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiGiayToToCollectionIfMissing([], null, danhMucLoaiGiayTo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiGiayTo);
      });

      it('should return initial array if no DanhMucLoaiGiayTo is added', () => {
        const danhMucLoaiGiayToCollection: IDanhMucLoaiGiayTo[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiGiayToToCollectionIfMissing(danhMucLoaiGiayToCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiGiayToCollection);
      });
    });

    describe('compareDanhMucLoaiGiayTo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiGiayTo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiGiayTo(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiGiayTo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiGiayTo(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiGiayTo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiGiayTo(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiGiayTo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
