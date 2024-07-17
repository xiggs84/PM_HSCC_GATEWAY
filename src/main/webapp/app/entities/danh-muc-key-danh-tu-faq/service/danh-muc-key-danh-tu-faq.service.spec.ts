import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-key-danh-tu-faq.test-samples';

import { DanhMucKeyDanhTuFaqService } from './danh-muc-key-danh-tu-faq.service';

const requireRestSample: IDanhMucKeyDanhTuFaq = {
  ...sampleWithRequiredData,
};

describe('DanhMucKeyDanhTuFaq Service', () => {
  let service: DanhMucKeyDanhTuFaqService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucKeyDanhTuFaq | IDanhMucKeyDanhTuFaq[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucKeyDanhTuFaqService);
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

    it('should create a DanhMucKeyDanhTuFaq', () => {
      const danhMucKeyDanhTuFaq = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucKeyDanhTuFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucKeyDanhTuFaq', () => {
      const danhMucKeyDanhTuFaq = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucKeyDanhTuFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucKeyDanhTuFaq', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucKeyDanhTuFaq', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucKeyDanhTuFaq', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucKeyDanhTuFaqToCollectionIfMissing', () => {
      it('should add a DanhMucKeyDanhTuFaq to an empty array', () => {
        const danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq = sampleWithRequiredData;
        expectedResult = service.addDanhMucKeyDanhTuFaqToCollectionIfMissing([], danhMucKeyDanhTuFaq);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucKeyDanhTuFaq);
      });

      it('should not add a DanhMucKeyDanhTuFaq to an array that contains it', () => {
        const danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq = sampleWithRequiredData;
        const danhMucKeyDanhTuFaqCollection: IDanhMucKeyDanhTuFaq[] = [
          {
            ...danhMucKeyDanhTuFaq,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucKeyDanhTuFaqToCollectionIfMissing(danhMucKeyDanhTuFaqCollection, danhMucKeyDanhTuFaq);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucKeyDanhTuFaq to an array that doesn't contain it", () => {
        const danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq = sampleWithRequiredData;
        const danhMucKeyDanhTuFaqCollection: IDanhMucKeyDanhTuFaq[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucKeyDanhTuFaqToCollectionIfMissing(danhMucKeyDanhTuFaqCollection, danhMucKeyDanhTuFaq);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucKeyDanhTuFaq);
      });

      it('should add only unique DanhMucKeyDanhTuFaq to an array', () => {
        const danhMucKeyDanhTuFaqArray: IDanhMucKeyDanhTuFaq[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucKeyDanhTuFaqCollection: IDanhMucKeyDanhTuFaq[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucKeyDanhTuFaqToCollectionIfMissing(danhMucKeyDanhTuFaqCollection, ...danhMucKeyDanhTuFaqArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq = sampleWithRequiredData;
        const danhMucKeyDanhTuFaq2: IDanhMucKeyDanhTuFaq = sampleWithPartialData;
        expectedResult = service.addDanhMucKeyDanhTuFaqToCollectionIfMissing([], danhMucKeyDanhTuFaq, danhMucKeyDanhTuFaq2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucKeyDanhTuFaq);
        expect(expectedResult).toContain(danhMucKeyDanhTuFaq2);
      });

      it('should accept null and undefined values', () => {
        const danhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq = sampleWithRequiredData;
        expectedResult = service.addDanhMucKeyDanhTuFaqToCollectionIfMissing([], null, danhMucKeyDanhTuFaq, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucKeyDanhTuFaq);
      });

      it('should return initial array if no DanhMucKeyDanhTuFaq is added', () => {
        const danhMucKeyDanhTuFaqCollection: IDanhMucKeyDanhTuFaq[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucKeyDanhTuFaqToCollectionIfMissing(danhMucKeyDanhTuFaqCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucKeyDanhTuFaqCollection);
      });
    });

    describe('compareDanhMucKeyDanhTuFaq', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucKeyDanhTuFaq(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucKeyDanhTuFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucKeyDanhTuFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucKeyDanhTuFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucKeyDanhTuFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucKeyDanhTuFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucKeyDanhTuFaq(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
