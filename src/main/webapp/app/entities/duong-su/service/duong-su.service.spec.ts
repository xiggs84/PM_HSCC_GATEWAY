import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDuongSu } from '../duong-su.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../duong-su.test-samples';

import { DuongSuService, RestDuongSu } from './duong-su.service';

const requireRestSample: RestDuongSu = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DuongSu Service', () => {
  let service: DuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: IDuongSu | IDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DuongSuService);
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

    it('should create a DuongSu', () => {
      const duongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(duongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DuongSu', () => {
      const duongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(duongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDuongSuToCollectionIfMissing', () => {
      it('should add a DuongSu to an empty array', () => {
        const duongSu: IDuongSu = sampleWithRequiredData;
        expectedResult = service.addDuongSuToCollectionIfMissing([], duongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(duongSu);
      });

      it('should not add a DuongSu to an array that contains it', () => {
        const duongSu: IDuongSu = sampleWithRequiredData;
        const duongSuCollection: IDuongSu[] = [
          {
            ...duongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDuongSuToCollectionIfMissing(duongSuCollection, duongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DuongSu to an array that doesn't contain it", () => {
        const duongSu: IDuongSu = sampleWithRequiredData;
        const duongSuCollection: IDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addDuongSuToCollectionIfMissing(duongSuCollection, duongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(duongSu);
      });

      it('should add only unique DuongSu to an array', () => {
        const duongSuArray: IDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const duongSuCollection: IDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDuongSuToCollectionIfMissing(duongSuCollection, ...duongSuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const duongSu: IDuongSu = sampleWithRequiredData;
        const duongSu2: IDuongSu = sampleWithPartialData;
        expectedResult = service.addDuongSuToCollectionIfMissing([], duongSu, duongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(duongSu);
        expect(expectedResult).toContain(duongSu2);
      });

      it('should accept null and undefined values', () => {
        const duongSu: IDuongSu = sampleWithRequiredData;
        expectedResult = service.addDuongSuToCollectionIfMissing([], null, duongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(duongSu);
      });

      it('should return initial array if no DuongSu is added', () => {
        const duongSuCollection: IDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDuongSuToCollectionIfMissing(duongSuCollection, undefined, null);
        expect(expectedResult).toEqual(duongSuCollection);
      });
    });

    describe('compareDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDuongSu(entity1, entity2);
        const compareResult2 = service.compareDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDuongSu(entity1, entity2);
        const compareResult2 = service.compareDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDuongSu(entity1, entity2);
        const compareResult2 = service.compareDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
