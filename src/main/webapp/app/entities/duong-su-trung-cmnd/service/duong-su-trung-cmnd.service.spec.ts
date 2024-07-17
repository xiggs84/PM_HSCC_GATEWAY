import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../duong-su-trung-cmnd.test-samples';

import { DuongSuTrungCmndService, RestDuongSuTrungCmnd } from './duong-su-trung-cmnd.service';

const requireRestSample: RestDuongSuTrungCmnd = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DuongSuTrungCmnd Service', () => {
  let service: DuongSuTrungCmndService;
  let httpMock: HttpTestingController;
  let expectedResult: IDuongSuTrungCmnd | IDuongSuTrungCmnd[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DuongSuTrungCmndService);
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

    it('should create a DuongSuTrungCmnd', () => {
      const duongSuTrungCmnd = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(duongSuTrungCmnd).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DuongSuTrungCmnd', () => {
      const duongSuTrungCmnd = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(duongSuTrungCmnd).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DuongSuTrungCmnd', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DuongSuTrungCmnd', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DuongSuTrungCmnd', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDuongSuTrungCmndToCollectionIfMissing', () => {
      it('should add a DuongSuTrungCmnd to an empty array', () => {
        const duongSuTrungCmnd: IDuongSuTrungCmnd = sampleWithRequiredData;
        expectedResult = service.addDuongSuTrungCmndToCollectionIfMissing([], duongSuTrungCmnd);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(duongSuTrungCmnd);
      });

      it('should not add a DuongSuTrungCmnd to an array that contains it', () => {
        const duongSuTrungCmnd: IDuongSuTrungCmnd = sampleWithRequiredData;
        const duongSuTrungCmndCollection: IDuongSuTrungCmnd[] = [
          {
            ...duongSuTrungCmnd,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDuongSuTrungCmndToCollectionIfMissing(duongSuTrungCmndCollection, duongSuTrungCmnd);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DuongSuTrungCmnd to an array that doesn't contain it", () => {
        const duongSuTrungCmnd: IDuongSuTrungCmnd = sampleWithRequiredData;
        const duongSuTrungCmndCollection: IDuongSuTrungCmnd[] = [sampleWithPartialData];
        expectedResult = service.addDuongSuTrungCmndToCollectionIfMissing(duongSuTrungCmndCollection, duongSuTrungCmnd);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(duongSuTrungCmnd);
      });

      it('should add only unique DuongSuTrungCmnd to an array', () => {
        const duongSuTrungCmndArray: IDuongSuTrungCmnd[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const duongSuTrungCmndCollection: IDuongSuTrungCmnd[] = [sampleWithRequiredData];
        expectedResult = service.addDuongSuTrungCmndToCollectionIfMissing(duongSuTrungCmndCollection, ...duongSuTrungCmndArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const duongSuTrungCmnd: IDuongSuTrungCmnd = sampleWithRequiredData;
        const duongSuTrungCmnd2: IDuongSuTrungCmnd = sampleWithPartialData;
        expectedResult = service.addDuongSuTrungCmndToCollectionIfMissing([], duongSuTrungCmnd, duongSuTrungCmnd2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(duongSuTrungCmnd);
        expect(expectedResult).toContain(duongSuTrungCmnd2);
      });

      it('should accept null and undefined values', () => {
        const duongSuTrungCmnd: IDuongSuTrungCmnd = sampleWithRequiredData;
        expectedResult = service.addDuongSuTrungCmndToCollectionIfMissing([], null, duongSuTrungCmnd, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(duongSuTrungCmnd);
      });

      it('should return initial array if no DuongSuTrungCmnd is added', () => {
        const duongSuTrungCmndCollection: IDuongSuTrungCmnd[] = [sampleWithRequiredData];
        expectedResult = service.addDuongSuTrungCmndToCollectionIfMissing(duongSuTrungCmndCollection, undefined, null);
        expect(expectedResult).toEqual(duongSuTrungCmndCollection);
      });
    });

    describe('compareDuongSuTrungCmnd', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDuongSuTrungCmnd(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDuongSuTrungCmnd(entity1, entity2);
        const compareResult2 = service.compareDuongSuTrungCmnd(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDuongSuTrungCmnd(entity1, entity2);
        const compareResult2 = service.compareDuongSuTrungCmnd(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDuongSuTrungCmnd(entity1, entity2);
        const compareResult2 = service.compareDuongSuTrungCmnd(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
