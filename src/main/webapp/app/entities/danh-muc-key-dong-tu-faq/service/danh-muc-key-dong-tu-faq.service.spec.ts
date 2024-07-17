import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-key-dong-tu-faq.test-samples';

import { DanhMucKeyDongTuFaqService } from './danh-muc-key-dong-tu-faq.service';

const requireRestSample: IDanhMucKeyDongTuFaq = {
  ...sampleWithRequiredData,
};

describe('DanhMucKeyDongTuFaq Service', () => {
  let service: DanhMucKeyDongTuFaqService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucKeyDongTuFaq | IDanhMucKeyDongTuFaq[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucKeyDongTuFaqService);
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

    it('should create a DanhMucKeyDongTuFaq', () => {
      const danhMucKeyDongTuFaq = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucKeyDongTuFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucKeyDongTuFaq', () => {
      const danhMucKeyDongTuFaq = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucKeyDongTuFaq).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucKeyDongTuFaq', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucKeyDongTuFaq', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucKeyDongTuFaq', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucKeyDongTuFaqToCollectionIfMissing', () => {
      it('should add a DanhMucKeyDongTuFaq to an empty array', () => {
        const danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq = sampleWithRequiredData;
        expectedResult = service.addDanhMucKeyDongTuFaqToCollectionIfMissing([], danhMucKeyDongTuFaq);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucKeyDongTuFaq);
      });

      it('should not add a DanhMucKeyDongTuFaq to an array that contains it', () => {
        const danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq = sampleWithRequiredData;
        const danhMucKeyDongTuFaqCollection: IDanhMucKeyDongTuFaq[] = [
          {
            ...danhMucKeyDongTuFaq,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucKeyDongTuFaqToCollectionIfMissing(danhMucKeyDongTuFaqCollection, danhMucKeyDongTuFaq);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucKeyDongTuFaq to an array that doesn't contain it", () => {
        const danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq = sampleWithRequiredData;
        const danhMucKeyDongTuFaqCollection: IDanhMucKeyDongTuFaq[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucKeyDongTuFaqToCollectionIfMissing(danhMucKeyDongTuFaqCollection, danhMucKeyDongTuFaq);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucKeyDongTuFaq);
      });

      it('should add only unique DanhMucKeyDongTuFaq to an array', () => {
        const danhMucKeyDongTuFaqArray: IDanhMucKeyDongTuFaq[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucKeyDongTuFaqCollection: IDanhMucKeyDongTuFaq[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucKeyDongTuFaqToCollectionIfMissing(danhMucKeyDongTuFaqCollection, ...danhMucKeyDongTuFaqArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq = sampleWithRequiredData;
        const danhMucKeyDongTuFaq2: IDanhMucKeyDongTuFaq = sampleWithPartialData;
        expectedResult = service.addDanhMucKeyDongTuFaqToCollectionIfMissing([], danhMucKeyDongTuFaq, danhMucKeyDongTuFaq2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucKeyDongTuFaq);
        expect(expectedResult).toContain(danhMucKeyDongTuFaq2);
      });

      it('should accept null and undefined values', () => {
        const danhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq = sampleWithRequiredData;
        expectedResult = service.addDanhMucKeyDongTuFaqToCollectionIfMissing([], null, danhMucKeyDongTuFaq, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucKeyDongTuFaq);
      });

      it('should return initial array if no DanhMucKeyDongTuFaq is added', () => {
        const danhMucKeyDongTuFaqCollection: IDanhMucKeyDongTuFaq[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucKeyDongTuFaqToCollectionIfMissing(danhMucKeyDongTuFaqCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucKeyDongTuFaqCollection);
      });
    });

    describe('compareDanhMucKeyDongTuFaq', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucKeyDongTuFaq(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucKeyDongTuFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucKeyDongTuFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucKeyDongTuFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucKeyDongTuFaq(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucKeyDongTuFaq(entity1, entity2);
        const compareResult2 = service.compareDanhMucKeyDongTuFaq(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
