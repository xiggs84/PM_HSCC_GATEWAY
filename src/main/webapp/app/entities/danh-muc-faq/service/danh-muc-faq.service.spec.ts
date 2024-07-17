import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucFaq } from '../danh-muc-faq.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-faq.test-samples';

import { DanhMucFaqService } from './danh-muc-faq.service';

const requireRestSample: IDanhMucFaq = {
  ...sampleWithRequiredData,
};

describe('DanhMucFaq Service', () => {
  let service: DanhMucFaqService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucFaq | IDanhMucFaq[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucFaqService);
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

    it('should create a DanhMucFaq', () => {
      const danhMucFaq = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucFaq', () => {
      const danhMucFaq = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucFaq', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucFaq', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucFaq', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucFaqToCollectionIfMissing', () => {
      it('should add a DanhMucFaq to an empty array', () => {
        const danhMucFaq: IDanhMucFaq = sampleWithRequiredData;
        expectedResult = service.addDanhMucFaqToCollectionIfMissing([], danhMucFaq);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucFaq);
      });

      it('should not add a DanhMucFaq to an array that contains it', () => {
        const danhMucFaq: IDanhMucFaq = sampleWithRequiredData;
        const danhMucFaqCollection: IDanhMucFaq[] = [
          {
            ...danhMucFaq,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucFaqToCollectionIfMissing(danhMucFaqCollection, danhMucFaq);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucFaq to an array that doesn't contain it", () => {
        const danhMucFaq: IDanhMucFaq = sampleWithRequiredData;
        const danhMucFaqCollection: IDanhMucFaq[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucFaqToCollectionIfMissing(danhMucFaqCollection, danhMucFaq);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucFaq);
      });

      it('should add only unique DanhMucFaq to an array', () => {
        const danhMucFaqArray: IDanhMucFaq[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucFaqCollection: IDanhMucFaq[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucFaqToCollectionIfMissing(danhMucFaqCollection, ...danhMucFaqArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucFaq: IDanhMucFaq = sampleWithRequiredData;
        const danhMucFaq2: IDanhMucFaq = sampleWithPartialData;
        expectedResult = service.addDanhMucFaqToCollectionIfMissing([], danhMucFaq, danhMucFaq2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucFaq);
        expect(expectedResult).toContain(danhMucFaq2);
      });

      it('should accept null and undefined values', () => {
        const danhMucFaq: IDanhMucFaq = sampleWithRequiredData;
        expectedResult = service.addDanhMucFaqToCollectionIfMissing([], null, danhMucFaq, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucFaq);
      });

      it('should return initial array if no DanhMucFaq is added', () => {
        const danhMucFaqCollection: IDanhMucFaq[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucFaqToCollectionIfMissing(danhMucFaqCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucFaqCollection);
      });
    });

    describe('compareDanhMucFaq', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucFaq(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucFaq(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
